function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)// when the event trigger run our func with the data we pass
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const eventBus = { on, emit }