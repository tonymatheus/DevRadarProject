const Dev = require('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');




module.exports = {
    async index(request,response){
        const {latitude,longitude, techs} =  request.query;
        
        const techsArray = parseStringAsArray(techs);
    
        const  devs = await Dev.find({
            techs:{
              $in:techsArray,  
            },
            location:{
                $near:{
                 type:'Point',
                 coordinates:[longitude,latitude],

                },
                $maxDistance:10000,
            },
            
        });
        
        //buscaar  em  um  raio  de até  10km 
        //filtrar  por  tecnologia
        return response.json({devs: []});
    }
}