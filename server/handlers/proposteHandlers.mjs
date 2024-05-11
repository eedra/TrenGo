import * as propostaModel from "../models/propostaModel.mjs"
import * as validators from "../validators/proposteValidators.mjs";
import mongoose from "mongoose";
//import {ObjectId} from "mongodb";

/**
 * Ottiene le proposte dal database.
 * @param {object} req - L'oggetto della richiesta.
 * @param {object} res - L'oggetto della risposta.
 */
async function getProposte(req, res){
    try {
        const proposte = await propostaModel.Proposta.find();
        
        if (!proposte) {
            return res.status(400).json({message: "Nessuna proposta disponibile."});
        }
        return res.status(200).json({proposte});

    } catch (error) {
        return res.status(500).json({message: "Errore durante il recupero delle proposte", error: error.message});
    }
}

/**
 * Ottiene una proposte dal database.
 * @param {object} req - L'oggetto della richiesta.
 * @param {object} res - L'oggetto della risposta.
 */
async function getPropostaById(req, res){
    try {
        const {id} = req.params;
        const proposta = await propostaModel.Proposta.findById(id);
        
        if (!proposta) {
            return res.status(400).json({message: "Proposta non trovata"});
        }
        return res.status(200).json({proposta});

    } catch (error) {
        return res.status(500).json({message: "Errore durante il recupero della proposta", error: error.message});
    }
}

/**
 * Inserisce una proposta nel database.
 * @param {object} req - L'oggetto della richiesta.
 * @param {object} res - L'oggetto della risposta.
 */
async function postProposta(req, res){
    const {creatore, usernameCreatore, titolo, categorie, nomeLuogo, descrizione, numeroPartecipantiDesiderato, data} = req.body;
    const errors = [];

    // Validazione delle categorie
    if (!validators.categorieInEnum(categorie)) 
        errors.push({field: "categorie", message: "Categorie non valide"});

    // Validazione del titolo
    if (!validators.validateTitolo(titolo)) 
        errors.push({field: "titolo", message: "Titolo troppo lungo o troppo corto"});

    // Validazione della descrizione
    if (!validators.validateDescrizione(descrizione)) 
        errors.push({field: "descrizione", message: "Descrizione troppo lunga"});


    // Gestione degli errori
    if (errors.length > 0) 
        return res.status(400).json({message: "error", errors});

    try {
        // Creazione della proposta
        const idCreatore = new mongoose.Types.ObjectId(creatore);
        const proposta = await propostaModel.Proposta.create({idCreatore, usernameCreatore, titolo, categorie, nomeLuogo, descrizione, numeroPartecipantiDesiderato, data});
        return res.status(200).json({proposta});

    } catch (error) {
        // Gestione dell'errore durante la creazione della proposta
        return res.status(500).json({message: "Errore durante la creazione della proposta", error: error.message});
    }
}

/**
 * Modifica una proposta nel database
 * @param {object} req - L'oggetto della richiesta.
 * @param {object} res - L'oggetto della risposta.
 */
async function modifyPropostaById(req, res){
    try {
        const {id} = req.params;
        const updates = req.body;

        // Aggiorna il documento proposta con tutti i campi forniti nel corpo della richiesta
        const proposta = await propostaModel.Proposta.findByIdAndUpdate(id, updates, {new: true});

        if (!proposta) {
            console.log("Proposta non trovata.");
            return res.status(404).json({message: "Proposta non trovata"});
        }

        return res.status(200).json({proposta});
    } catch (error) {
        return res.status(500).json({message: "Errore durante la modifica della proposta", error: error.message});
    }
}

/**
 * Elimina una proposta dal database
 * @param {object} req - L'oggetto della richiesta.
 * @param {object} res - L'oggetto della risposta.
 */
async function deletePropostaById(req, res){
    try {
        const { id } = req.params;

        // Trova e elimina la proposta dal database
        const proposta = await propostaModel.Proposta.findByIdAndDelete(id);

        if (!proposta) {
            return res.status(404).json({ message: "Proposta non trovata" });
        }

        return res.status(200).json({proposta});
    } catch (error) {
        return res.status(500).json({ message: "Errore durante l'eliminazione della proposta", error: error.message });
    }
}

// Esporta handlers
export {
    getProposte,
    getPropostaById,
    postProposta,
    modifyPropostaById,
    deletePropostaById
};