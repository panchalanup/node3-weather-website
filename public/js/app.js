console.log('This line print in client side console');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     console.log(response)
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''

        fetch(`/weather?address=${location}`)
            .then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                        messageOne.textContent = data.error;
                    }
                    else {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                        console.log(data.location)
                        console.log(data.forecast)
                        prevLocation = location;
                        prevData = data;
                    }
                })
            })

})
