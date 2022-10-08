const db = require('../database/models')
const {Op} = require('sequelize');

const movieController = {
    create : async (req, res) => {
        const {title, image, release_date, genre_id} = req.body;

        try {

            let nweMovie = await db.Movie.create({
                title,
                image,
                release_date,
                genre_id: +genre_id,
            })

            if(nweMovie){
                let response = {
                    ok: true,
                    meta: {
                        status: 200,
                    },
                    msg: 'Película creada con éxito',
                    data: nweMovie
                }
                return res.status(200).json(response);
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        let movieID = req.params.id;
        if(isNaN(movieID)){
            let response = {
                ok: false,
                meta: {
                    status: 400,
                },
                msg: 'Número ID incorrecto'
            }
            return res.status(400).json(response)
        }

        const {title, image, release_date, genre_id} = req.body

        try {

            let movies = await db.Movie.findAll();
            let movieId = movies.map(movie => movie.id)

            console.log(movieId)

            if(!movieId.includes(+movieID)){
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    msg: 'ID inexistente'
                }
                return res.status(400).json(response)
            }

            let updateMovie = await db.Movie.update({
                title,
                image,
                release_date, 
                genre_id,
            },{
                where: {
                    id: movieID
                }
            })

            let response;
            if(updateMovie[0] === 1){
                response = {
                    meta: {
                        status: 201,
                    },
                    msg: 'Los cambios fueron guardados con éxito',
                }
                return res.json(response);
            }
    

        } catch (error) {
            console.log(error)
        }
        
    },
    delete: async (req, res) => {
        let movieID = req.params.id;

        if(isNaN(movieID)){
            let response = {
                ok: false,
                meta: {
                    status: 400,
                },
                msg: 'Número ID incorrecto'
            }
            return res.status(400).json(response)
        }

        try {

            let movies = await db.Movie.findAll();
            let moviesId = movies.map(moive => moive.id)

            if(!moviesId.includes(+movieID)){
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    msg: 'ID inexistente'
                }
                return res.status(400).json(response)
            }

            let deleteMovie = await db.Movie.destroy({
                where: {
                    id: movieID
                }
            })

            if(deleteMovie === 1){

                let response = {
                    ok: true,
                    meta: {
                        status: 100,
                    },
                    msg: 'La película fue eliminada con éxito',
                }
                return res.json(response)
            }
        } catch (error) {
            console.log(error)
        }
    },
    search: async (req, res) => {
        try {
            let allMovies = await db.Movie.findAll({
                attributes : ['id','title', 'image', 'release_date']
            });

            if(req.query.name == '' || req.query.order == '' || req.query.genre == ''){
                return res.status(200).json({
                    msg: 'Ingrese una palabra clave'
        })
            }else if(req.query.name || req.query.order || req.query.genre ){

                if(req.query.genre){
                    let genres = await db.Genre.findAll({
                        include: [
                            {
                                model: db.Movie,
                                as: 'movies',
                                attributes : ['id', 'title']
                            }
                        ],
                        where : {
                            id : req.query.genre
                        },
                        attributes : ['name']
                    });

                    if(isNaN(req.query.genre)){
                        return res.json({
                            msg: 'Keyword inválido'
                        })
                    }else if(genres[0] == null){
                        return res.json({
                            msg: 'ID inexistente'
                        })
                    }

                    let response = {
                        meta: {
                            status: 200,
                            total:  genres.length
                        },
                        data: genres
                    }
                    return res.json(response);

                }else if(req.query.name){
                    let name = await db.Movie.findAll({
                        where: {
                            title: {[Op.substring] : req.query.name}
                        }
                    })

                    if(name[0] == undefined){
                        return res.json({
                            msg: 'Keyword inválido'
                        });
                    }

                    let response = {
                        meta: {
                            status: 200,
                            total:  name.length
                        },
                        data: name
                    }
                    return res.json(response);

                }else{

                    let order = req.query.order;
                    let lowerCase = order.toLowerCase();

                    if(lowerCase == 'asc' || lowerCase == 'desc'){
                        let result = await db.Movie.findAll({
                            order: [[ 'release_date', req.query.order]],
                            attributes: ['release_date','title', 'image']
                        })
                        if(result[0] != undefined){
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
                        return res.json({
                            msg: 'Keyword inválido, debe ingresar ASC || DESC'
                        });
                    }
                }
                
            }else{
                let response = {
                    meta: {
                        status: 200,
                        total:  allMovies.length
                    },
                    data: allMovies
                }
                return res.json(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = movieController;