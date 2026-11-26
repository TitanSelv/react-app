export const delayFn = async (delay: number = 500): Promise<unknown> => {
    return await new Promise ((res) => setTimeout(res, delay))
}