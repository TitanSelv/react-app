export const delayFn = async (delay = 500) => {
    return await new Promise ((res) => setTimeout(res, delay))
}