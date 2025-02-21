from services.mongo import MongoWriterService
from services.scraper.selenium import ChromeService
from services.formatter.mongo import FormatterService

def format_data(data: dict[str, list]) -> list[dict]:
    return FormatterService.format(data)

def save_data(docs: list[dict]) -> None:
    mongo_service = MongoWriterService()
    for doc in docs:
        mongo_service.insert_doc(filter_query={"data_id": doc["data_id"]}, doc=doc)

def main():
    if __name__ == "__main__":
        chrome_service = ChromeService(url="https://s3.amazonaws.com/tripdata/index.html")
        scraped_links = chrome_service.start_scraping()
        if scraped_links:
            formatted_data = format_data(scraped_links)
            save_data(formatted_data)



if __name__ == "__main__":
    main()
