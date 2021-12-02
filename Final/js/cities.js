const url = "https://raw.githubusercontent.com/AdamFinder/WDD330/main/Final/json/cities.json"
const images = ['images/sedona_600_400.jpg', 'images/phoenix_600x400.png', 'images/flagstaff_600x400.jpg']

fetch(url)
.then(response => response.json())
.then(jsonData => {
    const data = jsonData['cities']
    const cities = data.filter(city => city.name === 'Sedona' || city.name === 'Phoenix' || city.name === 'Flagstaff')
    
    cities.forEach(city => {
        const { name, motto, yearFounded, currentPopulation, topHikes } = city

        const card = document.createElement('section')
        const cityName = document.createElement('h2')
        const mottoText = document.createElement('h4')
        const year = document.createElement('div')
        const population = document.createElement('div')
        const hikes = document.createElement('div')
        const imageDiv = document.createElement('div')
        const txtWrapperDiv = document.createElement('div')
        const txtWithImage = document.createElement('div')
        imageDiv.classList.add('image')
        txtWrapperDiv.classList.add('txt')
        txtWithImage.classList.add('txtImage')

        cityName.textContent = name
        mottoText.textContent = motto
        year.innerHTML = `Year Founded: ${yearFounded}`
        population.innerHTML = `Population: ${currentPopulation}`
        hikes.innerHTML = `Top Hikes: ${topHikes}`
    
        card.appendChild(cityName)
        card.appendChild(mottoText)
        card.appendChild(txtWithImage)
        txtWithImage.appendChild(txtWrapperDiv)
        txtWrapperDiv.appendChild(year)
        txtWrapperDiv.appendChild(population)
        txtWrapperDiv.appendChild(hikes)
        txtWithImage.appendChild(imageDiv)

        document.querySelector('div.wcontent').appendChild(card)
    })
    const sections = Array.from(document.querySelectorAll('div.image'))

        for (let i = 0; i < sections.length; i++) {
            const image = document.createElement('img')
            image.setAttribute('src', images[i])
            sections[i].appendChild(image)
        }
})