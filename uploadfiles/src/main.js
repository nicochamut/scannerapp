import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  // const client = new Client()
  //    .setEndpoint('https://cloud.appwrite.io/v1')
  //    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //    .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.send('Hello, World!');
  }

 // Manejador de solicitud POST
if (req.method === 'POST') {
  // Verifica si hay datos en el cuerpo de la solicitud
  if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).send('Se esperaba un array de objetos en el cuerpo de la solicitud.');
  }

  const objectsToInsert = req.body;

  // Inserta cada objeto en la base de datos
  const insertPromises = objectsToInsert.map(object => {
      return database.createDocument(collectionId, object, ['*']); // Puedes especificar campos adicionales si es necesario
  });

  Promise.all(insertPromises)
      .then((responses) => {
          console.log('Objetos insertados con éxito:', responses);
          return res.status(200).json({ message: 'Objetos insertados con éxito', responses });
      })
      .catch((error) => {
          console.error('Error al insertar objetos:', error);
          return res.status(500).send('Error interno del servidor al insertar objetos.');
      });
}

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
