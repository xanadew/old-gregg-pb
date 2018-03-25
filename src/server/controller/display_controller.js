module.exports = {
    read: ( req, res, next ) => {
        const db = req.app.get('db');
        db.get_reviews([req.session.user.id])
          .then( reviews => res.status(200).send( reviews ) )
          .catch( () => res.status(500).send() );
      },

    getOne:(req,res,next) => {
        const db = req.app.get('db');
        const {reviewsid} = req.params
        db.read_review([reviewsid])
        .then( (review) => res.status(200).send(review[0]))
        .catch( () => res.status(500).send())
    },

    
    addReview: (req,res,next) => {
        const db = req.app.get('db');
        db.create_review([req.body.reviewName, 
                        req.body.reviewDesc, 
                        req.body.startDate, 
                        req.body.endDate, 
                        req.session.user.id])
        .then( (review) => {
            res.status(200).send(review)
        }).catch( (error) => {
            console.log(error)
            res.status(500).send(error)})
        },


        deleteReview:(req,res) => {
            const db = req.app.get('db')
            db.delete_review([req.params.reviewsid])
            .then((reviews) => res.status(200).send(reviews))
               .catch( (error) => {
                   console.log('delete', error)
                   res.status(500).send(error)
            })
        },

        editReview: (req,res, next) => {
            const db = req.app.get('db')
            db.edit_review([
                req.params.reviewsid, 
                req.body.reviewName, 
                req.body.reviewDesc, 
                req.body.startDate, 
                req.body.endDate, 
                ])
                .then(() => {
                    res.status(200).json()
                }).catch( (error) => {
                    console.log('errordelete', error)
                    res.status(500).send(error)
                })
            }
}