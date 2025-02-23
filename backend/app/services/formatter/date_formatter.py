class DateFormatterService:
    @classmethod
    def format(cls, data: list[str, dict]) -> dict[str, list[str]]:
        # flatten results to return only 1 list
        results = {}
        for date in data:
            date = date["data_id"]
            year = date[:4]
            month = "0"
            if len(date) == 6:
                month = date[4:6]

            if year in results:
                results[year].append(month)
            else:
                results[year] = [month]

        return results