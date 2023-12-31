const Job = require('../models/Jobs');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors')

const getAllJobs = async (req, res ) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt');
    if(!jobs) throw new NotFoundError("No job found")
    return  res.status(StatusCodes.OK).json({jobs, count : jobs.length});
}
const getJob = async (req, res ) => {
    const {user : {userId}, params : {id : jobId}} = req;

    const job = await Job.findOne({
        _id : jobId, createdBy : userId
    })
    if (!job) throw new NotFoundError("Invalid request");

    res.status(StatusCodes.OK).json({job});

}


const createJob = async (req, res ) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    
    res.status(StatusCodes.CREATED).json({job});
}


const updateJob = async (req, res ) => {
    const {user : {userId}, params : {id : jobId}} = req;
    const {company, position} = req.body;

    if(company === '' || position === ''){
        throw new BadRequestError("company or postion field cannot be empty");
    }

    let job = await Job.findOne({
        _id : jobId, createdBy : userId
    })
    if (!job) throw new NotFoundError("Invalid request");
    job = await Job.findByIdAndUpdate({_id : jobId, createdBy : userId}, req.body, {new : true, runValidators : true});
    res.status(StatusCodes.OK).json({job});
}
const deleteJob= async (req, res ) => {
    const {user : {userId}, params : {id : jobId}} = req;
    let job = await Job.findByIdAndDelete({_id : jobId, createdBy : userId});
    if (!job) throw new NotFoundError("Invalid request");
    res.status(StatusCodes.OK).send();
}

module.exports = {getAllJobs,getJob,createJob, updateJob, deleteJob};