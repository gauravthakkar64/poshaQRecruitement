const router = require('express').Router();
const Lable = require('../models/lable');
const Task = require('../models/tasks');
//Rendering to main page
router.get('/', function(req, res) {
    Todo.find({}).then(function(results){
        res.send(results);
    });
   
    
});

//create a new Lable
router.post('/create_label', function (req, res) {
    console.log(req.body);
            Lable.create(req.body).then(function (data) {
             data.save();
            Lable.find({}).then(function(results){
                res.send(results).status(200);
            });
           
            }).catch(function (err){
                res.status(344).json(err);
            });
});


//Update EXistig Lable
router.patch('/update_label/:name', function (req, res, next) {

    //Lable.findById(req.params.name, function (err, lable) {
        Lable.findOne({name: new RegExp('^'+req.params.name+'$', "i")}, function(err, lable) {  
            if (!err) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                lable[p] = req.body[p];
            }
            lable.save(function (err) {
                if (!err) {
                    res.status(200).json(lable);
                } else {
                    res.status(344).json("failed");
                }
            });
        }
        else{
            res.status(444).json(err);
        }
    });
});

//Delete a lable
router.delete('/delete_label/:name',function(req,res){
    
    
    Lable.remove({name: new RegExp('^'+req.params.name+'$', "i")},function(err){
        if(err){
            console.log(err);
        }
        Lable.find({}).then(function(results){
            res.send(results).status(200);
        });
       
    });
});

//Create a new Task

router.post('/create_task', function (req, res) {
    console.log(req.body);
            Task.create(req.body).then(function (data) {
             data.save();
             Lable.findOne({name: new RegExp('^'+'To-Do'+'$', "i")}, function(err, doc) {
                    
                    var lable=doc;
                    console.log("found ",lable);
                    lable.tasks.push(data.name);
                   
                    
                        if (lable._id) {
                            delete lable._id;
                        }
                        for (var p in lable) {
                            lable[p] = lable[p];
                        }
                        lable.save(function (err) {
                            if (!err) {
                                Task.find({}).then(function(results){
                
                                    res.send(results).status(200);
                                });
                            } else {
                                res.status(344).json("failed");
                            }
                        });
                    
                   
            });
             
            
            }).catch(function (err){
                res.status(344).json(err);
            });
});

//Move EXistig task
router.patch('/move_task/:name', function (req, res, next) {

    Task.findOne({name: new RegExp('^'+req.params.name+'$', "i")}, function(err, doc) {
                    
        var task=doc;
        console.log("found ",task);
        var previous_status=task.status;
       task.status=req.body.status;
       if (task._id) {
        delete task._id;
         }
        for (var p in task) {
            task[p] = task[p];
        }
        task.save(function (err) {
            if (!err) {
                Lable.findOne({name: new RegExp('^'+previous_status+'$', "i")}, function(err, doc) {
                    
                    var lable=doc;
                    console.log("found ",lable);
                    
                    Lable.findOne({name: new RegExp('^'+req.body.status+'$', "i")}, function(err, doc) {
                    
                        var lable=doc;
                        console.log("found ",lable);
                        
                        lable.tasks.push(req.params.name);
                       
                        
                            if (lable._id) {
                                delete lable._id;
                            }
                            for (var p in lable) {
                                lable[p] = lable[p];
                            }
                            lable.save(function (err) {
                                if (err) {
                                    res.status(344).json("failed"); 
                                } 
                            });
                        
                       
                });
                
                    lable.tasks.pull(req.params.name);
                   
                    
                        if (lable._id) {
                            delete lable._id;
                        }
                        for (var p in lable) {
                            lable[p] = lable[p];
                        }
                        lable.save(function (err) {
                            if (!err) {
                                Task.find({}).then(function(results){
                
                                    res.send(results).status(200);
                                });
                            } else {
                                res.status(344).json("failed");
                            }
                        });
                    
                   
            });
            

                
            } else {
                res.status(344).json("failed");
            }
        });
        
       
        

       
    });
});

//Update Existing Task
router.patch('/update_task/:name', function (req, res, next) {
console.log('in here');
    Task.findOne({name: new RegExp('^'+req.params.name+'$', "i")}, function(err, task) {
        if (!err) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                task[p] = req.body[p];
            }
            task.save(function (err) {
                if (!err) {
                    res.status(200).json(task);
                } else {
                    res.status(344).json("failed");
                }
            });
        }
        else{
            res.status(444).json(err);
        }
    });
});

//Delete a Task
//Delete a lable
router.delete('/delete_task/:name',function(req,res){
  
    Task.findOne({name: new RegExp('^'+req.params.name+'$', "i")}, function(err, doc) {
                    
        var task=doc;
        console.log("found ",task);
        var status=task.status;
     
        Task.remove({name: new RegExp('^'+req.params.name+'$', "i")},function(err){
            if(err){
                console.log(err);
            }
            Lable.findOne({name: new RegExp('^'+status+'$', "i")}, function(err, doc) {
                    
                var lable=doc;
                console.log("found ",lable);
                lable.tasks.pull(req.params.name);
               
                
                    if (lable._id) {
                        delete lable._id;
                    }
                    for (var p in lable) {
                        lable[p] = lable[p];
                    }
                    lable.save(function (err) {
                        if (!err) {
                            Task.find({}).then(function(results){
            
                                res.send(results).status(200);
                            });
                        } else {
                            res.status(344).json("failed");
                        }
                    });
                
               
        });
        });
       
    });
});

module.exports = router;
