import os
import shutil
import zipfile

import requests
import polars as pl


class StatsService:
    def __init__(self, download_dir):
        self.download_dir = download_dir

    def _download_url(self,
                      url: str,
                      save_path: str,
                      chunk_size:int=128) -> None:
        filename = os.path.basename(url)
        r = requests.get(url, stream=True)
        with open(f"{save_path}/{filename}", 'wb') as fd:
            for index, chunk in enumerate(r.iter_content(chunk_size=chunk_size)):
                print(f"Chunk {index} / downloading {url}")
                fd.write(chunk)


    def _unzip_file(self, item: str,
                    download_base_path: str,
                    extraction_path: str) -> None:
        print(f"Unzip file {item}")
        file_name = os.path.abspath(f"{download_base_path}/{item}")  # get full path of files
        zip_ref = zipfile.ZipFile(file_name)
        # create zipfile object
        zip_ref.extractall(extraction_path)  # extract file to dir
        zip_ref.close()  # close file

    def _calculate_station_stats(self, df: pl.DataFrame, column_station_id_name: str) -> list[dict] | None:
        # calculate stats
        try:
            column_station_id_name = column_station_id_name
            count_start_station_id = (df.group_by(column_station_id_name)
                                      .len()
                                      .sort("len", descending=True)
                                      .head(5))
            count_start_station_id[column_station_id_name].to_list()
            filter_by_id_df = (df.filter(
                pl.col(column_station_id_name).is_in(count_start_station_id[column_station_id_name]
                                                     .to_list()
                                                     )
            ).unique(
                column_station_id_name)
            )['start_station_name', column_station_id_name]

            return (filter_by_id_df.join(count_start_station_id,
                                         on=column_station_id_name)
                    ).to_dicts()
        except:
            return None

    def _calculate_days_stats(self, df: pl.DataFrame) -> list[dict] | None:
        # calculate stats
        try:
            days_stats_df = (
                df.with_columns(
                    pl.col("dt_started_at").dt.weekday().alias("weekday"),
                    pl.col("dt_started_at").dt.strftime("%A").alias("day")
                )
                .group_by("weekday", "day")
                .len()
                .sort("len", descending=True)
                .head(5)
            )
            return days_stats_df.to_dicts()
        except:
            return None


    def run_stats(self, data: list[dict]) -> list[dict] | None:
        formatted_stats_data = []
        for index, data in enumerate(data):
            formatted_stats_data.append({**data})

            # recreate dir
            os.makedirs(self.download_dir, exist_ok=True)

            data_id = data["data_id"]
            # if date has year and month calculate
            if len(data_id) == 6:
                final_stats = {}
                for doc in data.get("data", []):
                    self._download_url(doc, self.download_dir, chunk_size=1024)
                    zip_files = [file for file in os.listdir(self.download_dir) if file.endswith(".zip")]
                    for item in zip_files:  # loop through items in dir
                        extraction_path = f"{self.download_dir}/{os.path.basename(item).split(".")[0]}"
                        self._unzip_file(item, self.download_dir, extraction_path)
                        files = [x for x in os.listdir(extraction_path) if x.endswith(".csv")]
                        dfs = [pl.read_csv(os.path.join(extraction_path, file), infer_schema_length=0) for file in
                               files]
                        if dfs:
                            df = pl.concat(dfs, parallel=True)
                            print(f"Calculate stats for file {doc}")
                            final_stats[doc] = {
                                "stations": self._calculate_station_stats(df, column_station_id_name="start_station_id"),
                                "days": self._calculate_days_stats(df)
                            }
                            print(final_stats)
                # add stats
                formatted_stats_data[index]["stats"] = final_stats
                # delete all files
                shutil.rmtree(self.download_dir)

        return formatted_stats_data

