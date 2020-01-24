const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');

module.exports = {
    
    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs);

    },
     
    async store (request,response){
        const {github_username,techs,latitude,longitude}=request.body;
        console.log(request.body);
        let dev = await Dev.findOne({github_username});
        console.log(dev);
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            console.log(apiResponse);
    
        const { name = login,avatar_url,bio} =apiResponse.data;
                
        const techsArrray = parseStringAsArray(techs);
        console.log(techsArrray);
    
        const location = {
            type:'Point', 
            coordinates:[longitude,latitude]
        };
    
    
         dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArrray,
            location,
        })

        return response.json(dev);    
    }

    },

};