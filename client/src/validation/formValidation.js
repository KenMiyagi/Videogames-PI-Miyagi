export const formValidation = (input) =>{
    const errors = {};
    //LOGIC
    if(!input.name) {
        errors.name = "Nombre requerido"
    }
    if(input.name.length>30){
        errors.name = `El nombre es demasiado largo (30)`
    }

    //Image (No hace falta)

    if(!input.description) {
        errors.description = "Descripción requerida"
    }
    if(input.description.length>255){
        errors.description = `La descripción es demasiada larga (255)`
    }

    //Rating

    if(!input.rating) {
        errors.rating = "Calificación requerida"
    }
    if(input.rating > 5 || input.rating < 0) {
        errors.rating = "Calificación incorrecto (0/5)"
    }

    //Platforms

    if(input.platforms.length === 0) {
        console.log(input.platforms.length);
        errors.platforms = "Seleccionar una o mas plataformas"
    }

    //Genres

    if(input.genres.length === 0) {
        console.log(input.genres.length);
        errors.genres = "Seleccionar uno o mas generos"
    }

    //Release

    if(!input.released){
        errors.released = "Fecha de creación requerida"
    }
    return errors
}