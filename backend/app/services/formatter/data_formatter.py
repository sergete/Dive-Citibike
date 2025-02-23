import itertools


class DataFormatterService:
    @classmethod
    def format(cls, data: list[dict[str, list]]) -> list[str]:
        # flatten results to return only 1 list
        return list(itertools.chain.from_iterable(
            [item['data'] for item in data ]
        ))