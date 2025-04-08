import os
from multiprocessing import Pool

from pymongo.errors import ServerSelectionTimeoutError

from services.mongo import MongoWriterService
from services.scraper.selenium import ChromeService
from services.formatter.mongo import FormatterService

from services.stats import StatsService

NUM_THREADS = os.getenv('NUM_THREADS', 2)

def format_data(data: dict[str, list]) -> list[dict]:
    return FormatterService.format(data)


def save_data(doc: dict) -> None:
    mongo_service = MongoWriterService()
    try:
        mongo_service.insert_doc(filter_query={"$and":[{"data_id": doc["data_id"]}, {"link": doc["link"]}]}, doc=doc)
    except ServerSelectionTimeoutError as ex:
        print("Mongo server timed out for", doc["data_id"])

def main():
    if __name__ == "__main__":
        chrome_service = ChromeService(url="https://s3.amazonaws.com/tripdata/index.html")
        scraped_links = chrome_service.start_scraping()
        if scraped_links:
            formatted_data = format_data(scraped_links)
            stats_service = StatsService(download_dir="./downloads")
            with Pool(processes=NUM_THREADS) as pool:
                result = pool.map_async(stats_service.run_stats, formatted_data)
                # Wait to finish all tasks
                # iterate results
                for result in result.get():
                    save_data(result)
                    print(f'Got result: {result}', flush=True)

        print("Process Complete")

if __name__ == "__main__":
    main()
