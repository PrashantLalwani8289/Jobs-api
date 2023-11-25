const getAllJobs = async (req, res ) => {
    res.send('getAllJobs');
}
const getJob = async (req, res ) => {
    res.send('getJob');
}
const createJob = async (req, res ) => {
    res.send('createJob');
}
const updateJob = async (req, res ) => {
    res.send('update JOb');
}
const deleteJob= async (req, res ) => {
    res.send(' delete Job');
}

module.exports = {getAllJobs,getJob,createJob, updateJob, deleteJob};