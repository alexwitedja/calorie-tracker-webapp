var router = require('express').Router();
// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

// Your Google Cloud Platform project ID
const projectId = 'caloriekcalculator-server';
const tableName =  "`caloriekcalculator-server.food_nutrtion.nutrition`"
// Creates a client
const bigquery = new BigQuery({
  projectId: projectId,
});

router.post('/findfood', function (req, res) {
    const { food } = req.body;
    //${`${tableName}`} ${food}
    var query = `with t as (
        SELECT * FROM ${`${tableName}`} WHERE name='${food}'
        )
   select cast(NULL as string) as msg, t.*
   from t
   union all
   select msg, t.*  
   from (select 'No rows returned' as msg) left join
        t
        on 1 = 0 
   where not exists (select 1 from t)`;

    bigquery.createQueryStream(query)
        .on('error', console.error)
        .on('data', function(row){
            res.json({
                success: true,
                foodData: row
            })
        })
        .on('end', function() {
            
        })

})

module.exports = router