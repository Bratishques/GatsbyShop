

export const useObserver = (threshold) => {

 
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: threshold
        }
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const trigger = entry.target
                    console.log("Triggered")
                    observer.unobserve(lazyImg)
                }
            })
        }, options)

        observer.observe(i)
     
    

    return observer 
}