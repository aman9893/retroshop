const registercontrollerObj = require('../controllers/registercontroller');
const logincontrollerObj = require('../controllers/login');
const contactBook =require('../controllers/contact-book/contact')
const billData =require('../controllers/bill-data/bill')
const tableData =require('../controllers/table-book/table');
const khatabookList =require('../controllers/khatabook');



const express = require('express')
const router =  express.Router();


//////////////////////////////////////////////////////////////////////////

router.get('/api/get_table', tableData.tabelInfoList);
router.put('/api/update_table', tableData.Updatetable);
router.post('/api/add_table', tableData.addTable);
router.delete('/api/delete_table/:id', tableData.deleteTable);


router.get('/api/get_attender', tableData.attenderInfoList);
router.put('/api/update_attender', tableData.UpdateAttender);
router.post('/api/add_attender', tableData.addattender);
router.delete('/api/delete_attender/:id', tableData.deleteAttender);
router.get('/api/get_monthly_data', tableData.monthlyDataFetch);

router.get('/api/get_menu', tableData.menuInfoList);
router.put('/api/update_menu', tableData.UpdateMenu);
router.post('/api/add_menu', tableData.addMenu);
router.delete('/api/delete_menu/:id', tableData.deleteMenu);
router.get('/api/filter_menu/:id',tableData.menuFilter)



 router.post('/api/addbill_data', billData.addBill);
 router.get('/api/bill_list', billData.billList);
 router.get('/api/today_bill_list', billData.todaybillList);

 
 router.delete('/api/delete_bill/:id', billData.deleteBill);
 router.put('/api/update_bill_info', billData.UpdatebillInfo);
 router.get('/api/getbill_byTableid/:id', billData.billListByid);
 router.get('/api/getbill_byBill/:id', billData.billListBillId);
 router.put('/api/complete_order', billData.UpdateCompeleteOrder);

 
 
 router.get('/api/getallcount/',billData.CountAllTable)

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
router.get('/api/contactbook_list', contactBook.contactBooklistData);
 router.post('/api/add_contactbook', contactBook.addcontactBook);
 router.delete('/api/delete_contact/:id', contactBook.deleteContactData);
 router.put('/api/update_contact_list', contactBook.UpdateConatctData);
 


 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 router.post('/api/add_category', billData.addcategory);
 router.get('/api/category_list', billData.categoryList);
 router.delete('/api/deletecategory/:id', billData.deleteCategoryid);
 router.put('/api/update_category', billData.updatecategory);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 router.get('/api/khatabook_list', khatabookList.khatabookList);
 router.get('/api/khataamount_list/:khatanum', khatabookList.khataamountbyid);
 router.post('/api/add_khatabook', khatabookList.addKhataBook);
 router.post('/api/addamount_khatabook', khatabookList.addKhataBookAmount);
 router.delete('/api/delete_khatahisab/:id', khatabookList.deleteKhatahisab);
 router.delete('/api/delete_khatahisabCustomer/:id', khatabookList.deleteKhataCustomer);

//  khatabooklist: 'api/khatabook_list',
//        addkhatabook: 'api/add_khatabook',
//        addKhataAmount: 'api/addamount_khatabook',
//        khataAmountbooklist:'api/khataamount_list',
//        deleteKhataHisab:'api/delete_khatahisab',
//        deleteKhataCustomer:'api/delete_khataCustomer',

module.exports = router;
