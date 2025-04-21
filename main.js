const buscarBtn = document.getElementById("buscar-clima")
const btnLoc = document.getElementById('btn-loc')
const resultTemp = document.getElementById("temperatura")
const resultClima = document.getElementById("clima")
const resultUmidade = document.getElementById("umidade")
const resultPressao = document.getElementById("pressao")

function toggleLoading(show) {
    const loadingDiv = document.getElementById("loading");
    loadingDiv.style.display = show ? "block" : "none";
}

buscarBtn.addEventListener("click", () => {
    const buscarInput = document.getElementById("cidade")
    const input = buscarInput.value
    const result = document.getElementById("resultado")
    const resultLoc = document.getElementById("resultado-loc")

    resultLoc.innerHTML = ""

    toggleLoading(true)


    const apiKey = "3f77da438c85bb37b4cb2f0517753764"
    const urlTempo = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric&lang=pt_br`

    fetch(urlTempo)
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .then(errorData => {
                        throw new Error(errorData.message)
                    })
            }
            return response.json()
        })
        .then(dados => {
            const temp = dados.main.temp
            const umidade = dados.main.humidity
            const descricao = dados.weather[0].description;
            const pressao = dados.main.pressure
            result.innerHTML = `Tempo agora em: ${input}`
            resultTemp.innerHTML = `Temperatura: ${temp}°C`
            resultClima.innerHTML = `Clima: ${descricao}`
            resultUmidade.innerHTML = `Umidade: ${umidade}%`
            resultPressao.innerHTML = `Pressão: ${pressao}hPa`

            buscarInput.value = ""
            console.log(dados)
        })
        .catch(error => {
            result.innerHTML = `Erro: ${error.message}`//esse parametro estava vazio, ja que eu so estava passando throw new error la em cima
        })

        .finally(() => {
            toggleLoading(false);
        })

})

btnLoc.addEventListener("click", () => {
    const resultLoc = document.getElementById("resultado-loc")
    const result = document.getElementById("resultado")
    result.innerHTML = ""

    toggleLoading(true)

    const urlLoc = "https://ipapi.co/json/"
    fetch(urlLoc)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            const city = data.city
            const region = data.region_code
            resultLoc.innerHTML = `Tempo agora em ${city}, ${region}`


            const apiKey = "3f77da438c85bb37b4cb2f0517753764"
            const urlTempo = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`

            fetch(urlTempo)
                .then(response => {
                    if (!response.ok) {
                        return response.json()
                            .then(errorData => {
                                throw new Error(errorData.message)
                            })
                    }
                    return response.json()
                })
                .then(dados => {
                    const temp = dados.main.temp
                    const umidade = dados.main.humidity
                    const descricao = dados.weather[0].description;
                    const pressao = dados.main.pressure

                    resultTemp.innerHTML = `Temperatura: ${temp}°C`
                    resultClima.innerHTML = `Clima: ${descricao}`
                    resultUmidade.innerHTML = `Umidade: ${umidade}%`
                    resultPressao.innerHTML = `Pressão: ${pressao}hPa`
                    console.log(dados)
                })
                .catch(error => {
                    result.innerHTML = `Erro: ${error.message}`
                })

                .finally(() => {
                    toggleLoading(false);
                })
        })
})


