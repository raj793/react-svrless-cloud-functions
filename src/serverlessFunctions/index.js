const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const axios = require('axios')

exports.formSubmit = async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*')

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    }
    else
    {
        //Enable CORS and Content-Type headers
        res.set('Access-Control-Allow-Origin', "*")
        res.set('Access-Control-Allow-Headers', 'Content-Type')

        //Account details
        const projId = "xxxxxxxxxxxx-xxxxxx"
        const bucket = "xxxxxxxxxxxx"
        const invisibleRecaptchaSecret = "xxxxxxxxxxxxxxxxxxxxxxxxx"

        //verify recaptcha token
        const recaptchaBaseUrl = 'https://www.google.com/recaptcha/api/siteverify'
        const verificationUrl = `${recaptchaBaseUrl}?response=${req.body.token}&secret=${invisibleRecaptchaSecret}`
        axios.post(verificationUrl, {
        })
        .then((resp) => {
            console.log(resp.data)
            if(resp.data.success === false)
            {
                res.status(400).send('Google recaptcha verification failed!')
                throw new Error("Google recaptcha verification failed!")
            }
        })
        .catch((error) => {
            throw error
        })

        // Creates a GCS client
        const storage = new Storage({
        projectId: projId,
        });

        console.log("Starting...")

        const tmpFolderPrefix = "/tmp"
        const fileExtension = ".json"
        const filename = `${req.body.email}${fileExtension}`
        const filePath = `${tmpFolderPrefix}/${filename}`

        // Lists files in the bucket
        let [files] = await storage.bucket(bucket).getFiles()

        let fileNames = []
        files.map((file)=>{
            fileNames.push(file.metadata.name)
        })

        //Check if file with email already exists?
        if(fileNames.includes(filename))
        {
            res.status(400).send('Email already exists!')
            throw new Error("File already exists!")
        }

        //Convert file to JSON String
        const jsonString = JSON.stringify(req.body)

        //Write file to sandbox
        fs.writeFile(`${filePath}`, jsonString, function (err) {
            if (err) {
                res.status(400).send('Error writing file to sandbox!')
                throw err
            };
            console.log('Saved!');
        });

        try{
            //Upload file to GCS
            await storage.bucket(bucket).upload(`${filePath}`, {
                // Support for HTTP requests made with `Accept-Encoding: gzip`
                gzip: true,
                metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'no-cache',
                },
            })
            deleteFileFromSandbox(filePath)
            res.status(200).send('Email registered successfully!')
        }
        catch(err){
            deleteFileFromSandbox(filePath)
            res.status(400).send('Error! Couldn\'t write to cloud storage.')
            throw err
        }
    }
}

function deleteFileFromSandbox(filePath) {
    //Delete file from sandbox
    fs.unlink(`${filePath}`, function (err) {
        if (err) {
            throw err
        };
        console.log('File garbage removed!')
    });
}