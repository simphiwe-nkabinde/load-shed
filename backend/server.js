
const { default: axios } = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors({origin: '*'}))
app.use(express.json());

//get Current Status
app.get('/getCurrentStatus', (req, res) => {
    axios('http://loadshedding.eskom.co.za/LoadShedding/GetStatus')
    .then(data => res.send({data: data.data}))
    .catch(err => res.send(err))
})
//get Municipalities By Province
app.get('/getMunicipalitiesByProvince/:id', (req, res) => {
    let municipalityId = req.params.id
    axios(`http://loadshedding.eskom.co.za/LoadShedding/GetMunicipalities/?Id=${municipalityId}`)
    .then(data => res.send(data.data))
    .catch(err => res.send(err))
})
//search Suburbs
app.get('/searchSuburbs/:search', (req, res) => {
    const searchTerm = req.params.search
    axios(`http://loadshedding.eskom.co.za/LoadShedding/FindSuburbs?searchText=${searchTerm}&maxResults=300`)
    .then(data => res.send(data.data))
    .catch(err => res.send(err))
})
//search Suburbs In Municipality
app.get('/searchSuburbsInMunicipality/:id/:search', (req, res) => {
    let municipalityId = req.params.id
    const searchTerm = req.params.search
    axios(`https://loadshedding.eskom.co.za/LoadShedding/GetSurburbData/?pageSize=100&pageNum=1&searchTerm=${searchTerm}&id=${municipalityId}`)
    .then(data => res.send(data.Results))
    .catch(err => res.send(err))
})
//get Suburb Schedule
app.get('/getSuburbSchedule/:id/:loadSheddingStage', (req, res) => {
    let suburbId = req.params.id
    const stage = req.params.loadSheddingStage
    axios(`https://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/${suburbId}/${stage}/_/1`)
    .then(
        data => {
            console.log('header: ', data.headers['content-type']);
            let contentType = data.headers['content-type'];
            if (contentType.includes('text/html')) {
                return res.json({err: 'no schedule found for area'})
            }
            res.send(data.data)
        })
    .catch(err => res.send(err))
})
//get Full Suburb Schedule
app.get('/getFullSuburbSchedule/:id', (req, res) => {
    let suburbId = req.params.id
    axios(`https://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/${suburbId}/1/_/1`)
    .then(
        data => {
            console.log('header: ', data.headers['content-type']);
            let contentType = data.headers['content-type'];
            if (contentType.includes('text/html')) {
                return res.json({err: 'no schedule found for area'})
            }
            res.send(data.data)
        })
    .catch(err => res.send(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})