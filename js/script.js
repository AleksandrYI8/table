let in_first = document.querySelector('#in_f')
let in_sec = document.querySelector('#in_s')
let table = document.querySelector('table')
let bas = "http://localhost:8080" + "/toodos/"
let form = document.querySelector('form')

const data = new Date()






fetch(bas)
    .then((res) => res.json())
    .then((res) => reload(res))



form.onsubmit = (e) => {
    e.preventDefault()



    let student = {
        id: Math.random(),
        name: in_first.value,
        age: data.getFullYear() - in_sec.value
    }

    fetch(bas, {
        method: "post",
        body: JSON.stringify(student),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => {
        if (res.status === 200 || res.status === 201) {
            fetch(bas)
                .then((res) => res.json())
                .then((res) => reload(res))

            in_first.value = ""
            in_sec.value = ""
        }
    })

}




function reload(massiv) {
    table.innerHTML = ""


    for (let elem of massiv) {
        let tr_f = document.createElement('tr')
        let td_f = document.createElement('td')
        let td_s = document.createElement('td')
        let td_th = document.createElement('td')
        let td_fth = document.createElement('td')
        let change = document.createElement('img')
        let delet = document.createElement('img')

        td_f.innerHTML = massiv.indexOf(elem) + 1
        td_s.innerHTML = elem.name
        td_th.innerHTML = elem.age
        change.src = "./img/change.png"
        delet.src = "./img/rubish.png"

        table.append(tr_f)
        tr_f.append(td_f, td_s, td_th, td_fth)
        td_fth.append(change, delet)

        delet.onclick = () => {
            fetch(bas + elem.id, {
                method: "delete"
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    tr_f.remove()
                }
            })
        }

        change.onclick = () => {
            let prm = prompt()
            let val = {name : prm.valueOf()}

            fetch(bas + elem.id, {
                method: "PATCH",
                body: JSON.stringify(val),
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    fetch(bas)
                        .then((res) => res.json())
                        .then((res) => reload(res))

                }
            })
        }
    }
}