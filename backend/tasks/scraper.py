import os.path
import shutil
import zipfile

import requests
from pymongo.errors import ServerSelectionTimeoutError

from services.mongo import MongoWriterService
from services.scraper.selenium import ChromeService
from services.formatter.mongo import FormatterService

from services.stats import StatsService


def format_data(data: dict[str, list]) -> list[dict]:
    return FormatterService.format(data)

def save_data(docs: list[dict]) -> None:
    mongo_service = MongoWriterService()
    for doc in docs:
        try:
            mongo_service.insert_doc(filter_query={"data_id": doc["data_id"]}, doc=doc)
        except ServerSelectionTimeoutError as ex:
            print("Mongo server timed out for", doc["data_id"])


def main():
    if __name__ == "__main__":
        chrome_service = ChromeService(url="https://s3.amazonaws.com/tripdata/index.html")
        scraped_links = chrome_service.start_scraping()
        if scraped_links:
            formatted_data = format_data(scraped_links)
            stats_service = StatsService(download_dir="./downloads")
            formatted_stats_data = stats_service.run_stats(formatted_data)

            save_data(formatted_stats_data)

        print("Process Complete")

if __name__ == "__main__":
    main()
