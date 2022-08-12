require('./app/app').listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${process.env.PORT || 8080}`);
});

