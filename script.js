const form = document.querySelector('#form');
const input = document.querySelector('#input__number');
const submit = document.querySelector('#submit');

const promise = new Promise((resolve, reject) => {
    resolve(fetch(`https://jsonplaceholder.typicode.com/posts/`))
    
})

form.addEventListener('input', () => {
    
    if (input.value < 0 || input.value > 100) {
        alert(`Enter correct id: 1 - 100`);
        submit.disabled = true;
    } else {
        submit.disabled = false;
        submit.addEventListener('click', (event) => {
            event.preventDefault();
            const showUser = fetch(`https://jsonplaceholder.typicode.com/posts/${input.value}`)
                .then(response => response.json())
                .then(json => {
                    const newDiv = document.createElement("div")
                    const newP = document.createElement("p")
                    const newP2 = document.createElement("p")
                    document.querySelector('body').insertBefore(newDiv, document.querySelector('script'))
                    newDiv.appendChild(newP)
                    newDiv.appendChild(newP2)
                    // console.log(json)
                    newP.textContent = `ID: ${json.id} `
                    newP2.textContent = `Title: ${json.title} `

                    const newButton = document.createElement('button')
                    newButton.textContent = 'Get user comment '
                    newDiv.appendChild(newButton)

                    newButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        const promise2 = new Promise((resolve, reject) => {
                                resolve(fetch(`https://jsonplaceholder.typicode.com/comments/`))
                        })

                        const showUserComment = fetch(`https://jsonplaceholder.typicode.com/comments/${input.value}`)
                                            .then(response => response.json())
                                            .then(data => {

                                                const newDiv2 = document.createElement('div')
                                                const newP3 = document.createElement('p')
                                                const newP4 = document.createElement('p')

                                                newDiv.appendChild(newDiv2)
                                                newDiv2.appendChild(newP3)
                                                newDiv2.appendChild(newP4)
                                                newP3.textContent = `Comment: ${data.body}`
                                                newP4.textContent = `Email: ${data.email}`
                                            })
                    })
                })
        })
    }
})

