from multiprocessing import Pool

class TreadExecutor:
    
    @staticmethod
    def run(method: callable, num_threads: int, *args):
        results = []
        with Pool(processes=num_threads) as pool:
            result = pool.starmap_async(method, *args)
            # Wait to finish all tasks
            # iterate results
            for result in result.get():
                results.append(result)
                print(f'Got result: {result}', flush=True)
