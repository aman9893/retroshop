const registercontrollerObj = require('../controllers/registercontroller');
const logincontrollerObj = require('../controllers/login');
const contactBook =require('../controllers/contact-book/contact')
const billData =require('../controllers/bill-data/bill')
const tableData =require('../controllers/table-book/table')


const express = require('express')
const router =  express.Router();


//////////////////////////////////////////////////////////////////////////

router.get('/api/get_table', tableData.tabelInfoList);
router.put('/api/update_table', tableData.Updatetable);
router.post('/api/add_table', tableData.addTable);
router.delete('/api/delete_table/:id', tableData.deleteTable);


router.get('/api/get_menu', tableData.menuInfoList);
router.put('/api/update_menu', tableData.UpdateMenu);
router.post('/api/add_menu', tableData.addMenu);
router.delete('/api/delete_menu/:id', tableData.deleteMenu);


 router.post('/api/addbill_data', billData.addBill);
 router.get('/api/bill_list', billData.billList);
 router.delete('/api/delete_bill/:id', billData.deleteBill);
 router.put('/api/update_bill_info', billData.UpdatebillInfo);
 router.get('/api/getbill_byTableid/:id', billData.billListByid);
 

router.post('/api/login', logincontrollerObj.authenticate);
router.post('/api/register', registercontrollerObj.register);
router.put('/api/update_user', registercontrollerObj.upateUser);
router.get('/api/get_admin_profile/:id', registercontrollerObj.getUserProfile);
router.get('/api/user_register_info/:id', registercontrollerObj.UaserListById);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



router.post('/api/forgetpassword', logincontrollerObj.forgetPassword);
router.put('/api/update_trial_days', logincontrollerObj.UpdatePaymentUserDays);
router.post('/api/UpdatePassword', logincontrollerObj.UpdatePassword);

router.get('/api/getAllusers', registercontrollerObj.AllUaserList);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





module.exports = router;
