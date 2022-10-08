const db = require('../database/models');
const {Op, json} = require('sequelize');

const characterController = {
    create : async (req, res) => {
        const {image, name, age, weigth, history} = req.body;

        try {

            let newCharacter = await db.Character.create({
                image,
                name,
                age: +age,
                weigth: +weigth,
                history
            })

            if(newCharacter){
                let response = {
                    ok: true,
                    meta: {
                        status: 200,
                    },
                    msg: 'Personaje creado con éxito!',
                    data: newCharacter
                }
                return res.status(200).json(response);
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        let characterID = req.params.id;

        if(isNaN(characterID)){
            let response = {
                ok: false,
                meta: {
                    status: 400,
                },
                msg: 'Número ID incorrecto'
            }
            return res.status(400).json(response)
        }

        const {image, name, age, weigth, history} = req.body

        try {

            let characters = await db.Character.findAll();
            let characterId = characters.map(character => character.id)

            if(!characterId.includes(+characterID)){
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    msg: 'ID inexistente'
                }
                return res.status(400).json(response)
            }

            let updateCharacter = await db.Character.update({
                image,
                name,
                age, 
                weigth,
                history
            },{
                where: {
                    id: characterID
                }
            })

            let response;
            if(updateCharacter[0] === 1){
                response = {
                    meta: {
                        status: 201,
                    },
                    msg: 'Los cambios fueron guardados con éxito!',
                }
                return res.json(response);
            }
    

        } catch (error) {
            console.log(error)
        }
        
    },
    delete: async (req, res) => {
        let characterID = req.params.id;

        if(isNaN(characterID)){
            let response = {
                ok: false,
                meta: {
                    status: 400,
                },
                msg: 'Número ID incorrecto!'
            }
            return res.status(400).json(response)
        }

        try {

            let characters = await db.Character.findAll();
            let characterId = characters.map(character => character.id)

            if(!characterId.includes(+characterID)){
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    msg: 'ID inexistente!'
                }
                return res.status(400).json(response)
            }

            let deleteCharacter = await db.Character.destroy({
                where: {
                    id: characterID
                }
            })

            if(deleteCharacter === 1){

                let response = {
                    ok: true,
                    meta: {
                        status: 100,
                    },
                    msg: 'El personaje fue eliminado con éxito!',
                }
                return res.json(response)
            }
        } catch (error) {
            console.log(error)
        }
    },
    search: async (req, res) => {
        try {

            let allCharacters = await db.Character.findAll({
                attributes : ['name', 'image', 'age', 'weigth', 'history'],
                include: [
                    {
                        model: db.Movie,
                        as: 'movies',
                        attributes: ['title', 'image']
                    }
                ]
            });

            if(req.query.name == '' || req.query.age == '' || req.query.movieId == ''){
                return res.status(200).json({
                    msg: 'Ingrese una palabra clave'
                })
            }else if(req.query.name || req.query.age  || req.query.movieId ){

                if(req.query.movieId){
                    let movies = await db.Movie.findAll({
                        include: ['characters'],
                        where : {
                            id : req.query.movieId
                        },
                       
                    });

                    if(movies[0] == undefined){
                        return res.json({
                            msg: 'Keyword inválido'
                        });
                    }

                    const char = Object.assign({}, movies);
                    const char2 = char[0].dataValues.characters.map(character => {
                        return character.name
                    })

                    return res.json(char2);
                }else{
                    let result = await db.Character.findAll({
                        where:{
                            [Op.or] : [
                                {name: {[Op.substring] : req.query.name}},
                                {age: {[Op.eq] : req.query.age}},
                            ]
                        },
                    })

                    console.log(result)

                    if(result[0] == undefined){
                        return res.json({
                            msg: `Personaje no encontrado`
                        });
                    }
                    let response = {
                        meta: {
                            status: 200,
                            total:  result.length
                        },
                        data: result
                    }
                    return res.json(response);
                }
            }else{
                let response = {
                    meta: {
                        status: 200,
                        total:  allCharacters.length
                    },
                    data: allCharacters
                }
                return res.json(response);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = characterController;