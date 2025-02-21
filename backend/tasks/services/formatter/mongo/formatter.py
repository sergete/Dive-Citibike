class FormatterService:
    @classmethod
    def format(cls, data: dict[str, list]) -> list[dict]:
        formatted_data: list[dict] = []
        for key, value in data.items():
            mongo_format = {
                "data_id": key,
                "data": value
            }
            formatted_data.append(mongo_format)
        return formatted_data