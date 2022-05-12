import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../components/popup';
import UpdateAndDeleteButton from '../components/common-components/update-and-delete-button';
import ConfirmationPopupContents from '../components/common-components/confirmation-popup-contents';
import './payments.css';

export default function Payments() {

//#region CREATE PAYMENT

	const [createPaymentInput, setCreatePaymentInput] = useState({receiptID: '', paymentType: '', paymentStatus: ''});

	const [createPaymentSubmitMessage, setCreatePaymentSubmitMessage] = useState('');
	const [createPaymentSubmitMessageStatus, setCreatePaymentSubmitMessageStatus] = useState(false);

	const [modalVisibleCreatePayment, setModalVisibleCreatePayment] = useState(false);
	const [createPaymentPopupOpen, setCreatePaymentPopupOpen] = useState(false);
	const [modalVisibleCreatePaymentConfirmation, setModalVisibleCreatePaymentConfirmation] = useState(false);
	const [createPaymentConfirmationPopupOpen, setCreatePaymentConfirmationPopupOpen] = useState(false);

	const [createPaymentPostStatus, setCreatePaymentPostStatus] = useState(false);
	const [createPaymentPostStatusMessage, setCreatePaymentPostStatusMessage] = useState(false);
	const [createPaymentPostDataClicked, setCreatePaymentPostDataClicked] = useState(false);

	function handleCreatePaymentOnChange(e) {
		let newCreatePaymentInput = {...createPaymentInput};
		newCreatePaymentInput[e.target.name] = e.target.value;
		// setCreatePaymentSubmitMessageStatus(false);
		setCreatePaymentInput(newCreatePaymentInput);
	}

	function onSubmitCreatePaymentInputValidation(e) {
		e.preventDefault();

		if(!createPaymentInput.receiptID && !createPaymentInput.paymentType && !createPaymentInput.paymentStatus) {
			setCreatePaymentSubmitMessageStatus(true)
			setCreatePaymentSubmitMessage('***All of the input fields are empty***');
			return;
		}
		else if(!createPaymentInput.receiptID || !createPaymentInput.paymentType || !createPaymentInput.paymentStatus) {
			setCreatePaymentSubmitMessageStatus(true)
			setCreatePaymentSubmitMessage('***Some of the input fields are empty***');
			return;
		}

		togglePopupCreatePaymentConfirmation();
	}

	function togglePopupCreatePayment() {
		setModalVisibleCreatePayment(!modalVisibleCreatePayment);
		setCreatePaymentPopupOpen(!createPaymentPopupOpen);
		setCreatePaymentSubmitMessageStatus(false);
	}

	function togglePopupCreatePaymentConfirmation(){
		setModalVisibleCreatePaymentConfirmation(!modalVisibleCreatePaymentConfirmation);
		setCreatePaymentConfirmationPopupOpen(!createPaymentConfirmationPopupOpen);
		togglePopupCreatePayment();
		setCreatePaymentSubmitMessageStatus(false);
	}

	function resetCreateInputsToDefault() {
		setCreatePaymentInput({receiptID: 0, paymentType: '', paymentStatus: ''});
		setCreatePaymentSubmitMessageStatus(false);
	}

	function xPopupCreatePaymentConfirmation() {
		togglePopupCreatePaymentConfirmation();
	}

	function closePopupCreatePaymentConfirmation() {
		resetCreateInputsToDefault();

		setModalVisibleCreatePaymentConfirmation(!modalVisibleCreatePaymentConfirmation);
		setCreatePaymentConfirmationPopupOpen(!createPaymentConfirmationPopupOpen);

		setCreatePaymentPostDataClicked(false);
		getAllPayment();
	}

	async function createPayment() {
		console.log(createPaymentInput);
		await ambrosialAxiosAPI.post('/createpayment', {
			receiptId: parseInt(createPaymentInput.receiptID),
			paymentType: createPaymentInput.paymentType,
			paymentStatus: createPaymentInput.paymentStatus
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);

			setCreatePaymentPostStatus(response.data.status);
			setCreatePaymentPostStatusMessage(response.data.message);

			setCreatePaymentInput({receiptID: 0, paymentType: '', paymentStatus: ''});
 		})
		.catch((error) => {
			console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
			console.log(`Error Status: ${error.response.data.status}`);
			console.log(`Error Message: ${error.response.data.message}`);

			setCreatePaymentPostStatus(error.response.data.status);
			setCreatePaymentPostStatusMessage(error.response.data.message);
		});
		setCreatePaymentPostDataClicked(true);
	}
//#endregion

//#region UPDATE PAYMENT

	const [updatePaymentInput, setUpdatePaymentInput] = useState({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''});
	const [pendingUpdate, setPendingUpdate] = useState({invoiceId: 0, receiptId: 0});

	const [updatePaymentSubmitMessage, setUpdatePaymentSubmitMessage] = useState('');
	const [updatePaymentSubmitMessageStatus, setUpdatePaymentSubmitMessageStatus] = useState(false);

	const [modalVisibleUpdatePayment, setModalVisibleUpdatePayment] = useState(false);
	const [updatePaymentPopupOpen, setUpdatePaymentPopupOpen] = useState(false);
	const [modalVisibleUpdatePaymentConfirmation, setModalVisibleUpdatePaymentConfirmation] = useState(false);
	const [updatePaymentConfirmationPopupOpen, setUpdatePaymentConfirmationPopupOpen] = useState(false);

	const [updatePaymentPostStatus, setUpdatePaymentPostStatus] = useState(false);
	const [updatePaymentPostStatusMessage, setUpdatePaymentPostStatusMessage] = useState(false);
	const [updatePaymentPostDataClicked, setUpdatePaymentPostDataClicked] = useState(false);

	function handleUpdatePaymentOnChange(e) {
		let updatePaymentInputValues = {...updatePaymentInput};
		updatePaymentInputValues[e.target.name] = e.target.value;
		setUpdatePaymentSubmitMessageStatus(false);
		setUpdatePaymentInput(updatePaymentInputValues);
	}

	function onSubmitUpdatePaymentInputValidation(e) {
		e.preventDefault();

		if(!updatePaymentInput.paymentType && !updatePaymentInput.paymentStatus) {
			setUpdatePaymentSubmitMessageStatus(true)
			setUpdatePaymentSubmitMessage('***All of the input fields are empty***');
			return;
		}
		else if(!updatePaymentInput.paymentType || !updatePaymentInput.paymentStatus) {
			setUpdatePaymentSubmitMessageStatus(true)
			setUpdatePaymentSubmitMessage('***Some of the input fields are empty***');
			return;
		}

		togglePopupUpdatePaymentConfirmation();
	}

	function updateOnClick(invoiceId, receiptId)
	{
		let newPendingUpdate = {invoiceId: invoiceId, receiptId: receiptId};
		setPendingUpdate(newPendingUpdate);
		togglePopupUpdatePayment();
	}

	function togglePopupUpdatePayment() {
		setModalVisibleUpdatePayment(!modalVisibleUpdatePayment);
		setUpdatePaymentPopupOpen(!updatePaymentPopupOpen);
	}

	function togglePopupUpdatePaymentConfirmation(){
		setModalVisibleUpdatePaymentConfirmation(!modalVisibleUpdatePaymentConfirmation);
		setUpdatePaymentConfirmationPopupOpen(!updatePaymentConfirmationPopupOpen);
		togglePopupUpdatePayment();
		setUpdatePaymentSubmitMessageStatus(false);
	}

	function resetUpdateInputsToDefault() {
		setUpdatePaymentInput({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''});
		setUpdatePaymentSubmitMessageStatus(false);
	}

	function xPopupUpdatePaymentConfirmation() {
		resetUpdateInputsToDefault();
		togglePopupUpdatePaymentConfirmation();
	}

	function closePopupUpdatePaymentConfirmation() {
		resetUpdateInputsToDefault();

		setModalVisibleUpdatePaymentConfirmation(!modalVisibleUpdatePaymentConfirmation);
		setUpdatePaymentConfirmationPopupOpen(!updatePaymentConfirmationPopupOpen);

		setUpdatePaymentPostDataClicked(false);

		getAllPayment();
	}

	async function updatePayment() {
		await ambrosialAxiosAPI.put(`/updatepayment/${pendingUpdate.invoiceId}`, {
			receiptId: pendingUpdate.receiptId,
			paymentType: updatePaymentInput.paymentType,
			paymentStatus: updatePaymentInput.paymentStatus
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);

			setUpdatePaymentPostStatus(response.data.status);
			setUpdatePaymentPostStatusMessage(response.data.message);

			setPendingUpdate({invoiceId: 0, receiptId: 0});
 		})
		.catch((error) => {
			console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
			console.log(`Error Status: ${error.response.data.status}`);
			console.log(`Error Message: ${error.response.data.message}`);

			setUpdatePaymentPostStatus(error.response.data.status);
			setUpdatePaymentPostStatusMessage(error.response.data.message);
		});
		setUpdatePaymentPostDataClicked(true);
	}
//#endregion

//#region DELETE PAYMENT

	const [pendingDelete, setPendingDelete] = useState({invoiceId: 0});

	const [deletePaymentSubmitMessage, setDeletePaymentSubmitMessage] = useState('');
	const [deletePaymentSubmitMessageStatus, setDeletePaymentSubmitMessageStatus] = useState(false);

	const [modalVisibleDeletePayment, setModalVisibleDeletePayment] = useState(false)
	const [modalVisibleDeletePaymentConfirmation, setModalVisibleDeletePaymentConfirmation] = useState(false);
	const [deletePaymentPopUpOpen, setDeletePaymentPopupOpen] = useState(false);
	const [deletePaymentConfirmationPopupOpen, setDeletePaymentConfirmationPopupOpen] = useState(false);

	const [deletePaymentPostStatus, setDeletePaymentPostStatus] = useState(false);
	const [deletePaymentPostStatusMessage, setDeletePaymentPostStatusMessage] = useState(false);
	const [deletePaymentPostDataClicked, setDeletePaymentPostDataClicked] = useState(false);
	

	function deleteOnClick(invoiceId) {
		let newPendingDelete = {invoiceId: invoiceId};
		setPendingDelete(newPendingDelete);
		togglePopupDeletePayment();
	}

	function togglePopupDeletePayment() {
		setModalVisibleDeletePayment(!modalVisibleDeletePayment);
		setDeletePaymentSubmitMessageStatus(false);
		setDeletePaymentPopupOpen(!deletePaymentPopUpOpen);
	}

	function togglePopupDeletePaymentConfirmation(){
		setModalVisibleDeletePaymentConfirmation(!modalVisibleDeletePaymentConfirmation);
		setDeletePaymentConfirmationPopupOpen(!deletePaymentConfirmationPopupOpen);
		setDeletePaymentPopupOpen(!deletePaymentPopUpOpen);
		setDeletePaymentSubmitMessageStatus(false);
	}

	function xPopupDeletePaymentConfirmation() {
		togglePopupDeletePaymentConfirmation();
	} 

	function closePopupDeletePaymentConfirmation() {
		setModalVisibleDeletePaymentConfirmation(!modalVisibleDeletePaymentConfirmation);
		setDeletePaymentConfirmationPopupOpen(!deletePaymentConfirmationPopupOpen);
		setModalVisibleDeletePayment(!modalVisibleDeletePayment);

		setDeletePaymentPostDataClicked(false);

		getAllPayment();
	}

	async function deletePayment() {

		await ambrosialAxiosAPI.delete(`/deletepayment/${pendingDelete.invoiceId}`, {
			invoiceId: pendingDelete.invoiceId
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);

			setDeletePaymentPostStatus(response.data.status);
			setDeletePaymentPostStatusMessage(response.data.message);
 		})
		.catch((error) => {
			console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
			console.log(`Error Status: ${error.response.data.status}`);
			console.log(`Error Message: ${error.response.data.message}`);

			setDeletePaymentPostStatus(error.response.data.status);
			setDeletePaymentPostStatusMessage(error.response.data.message);
		});
		setDeletePaymentPostDataClicked(true);
	}


//#endregion

//#region GET ALL PAYMENT
	useEffect(() => {
		getAllPayment();
	}, []);

	const [allPaymentLogsData, setAllPaymentLogsData] = useState([]);

	async function getAllPayment() {
		
		await ambrosialAxiosAPI.get('/viewpaymentlogs')
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);
			setAllPaymentLogsData(response.data.data);
 		})
		.catch((error) => {
				console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
				console.log(`Error Status: ${error.response.data.status}`);
				console.log(`Error Message: ${error.response.data.message}`);

				setAllPaymentLogsData([]);
		});
	}

	//#endregion


	return (
		<>
			<div className='createAndRefreshPayment'>
				<button className='refreshPaymentLogs' onClick={getAllPayment}>Refresh List</button>
				<button className='createPaymentButton' onClick={togglePopupCreatePayment}>Create Payment</button>
			</div>

			{modalVisibleCreatePayment && <div className='payment-modal'>
				{createPaymentPopupOpen && <Popup
					popupType='createPaymentPopup'
					handleClose={togglePopupCreatePayment}
					content={
						<form className='paymentForm' onSubmit={onSubmitCreatePaymentInputValidation}>
							<label className='paymentFormHeader'>Create Payment</label>

							<br /><br />

							<label className='createPaymentFormLabelText'>Receipt ID</label>
							<input className='createPaymentInputReceiptId' value={createPaymentInput.receiptID} type='number' name='receiptID' onChange={handleCreatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<label className='createPaymentFormLabelText'>Payment Type</label>
							<input className='createPaymentInputPaymentType' value={createPaymentInput.paymentType} type='text' name='paymentType' onChange={handleCreatePaymentOnChange} autoComplete='off'/>

							<br /><br />

							<label className='createPaymentFormLabelText'>Payment Status</label>
							<input className='createPaymentInputPaymentStatus' value={createPaymentInput.paymentStatus} type='text' name='paymentStatus' onChange={handleCreatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<button className='paymentButton'>Submit</button>

							<br /><br />

							{createPaymentSubmitMessageStatus && <label className='paymentFormLabelTextStatus'>{<label className='paymentFormLabelText'>{createPaymentSubmitMessage}</label>}</label>}
						</form>
					}/>
				}
			</div>
			}

			{modalVisibleCreatePaymentConfirmation && <div className='payment-confirmation-modal'>
				{createPaymentConfirmationPopupOpen && <Popup
				popupType='createPaymentConfirmationPopup'
				handleClose={togglePopupCreatePaymentConfirmation}
				content={
					<ConfirmationPopupContents
	         clickStatus={createPaymentPostDataClicked}
					 statusMessage={createPaymentPostStatusMessage}
					 invokeAction={createPayment}
					 xButtonClose={xPopupCreatePaymentConfirmation}
					 closeButton={closePopupCreatePaymentConfirmation}
					 invokeRefresh={()=>{}}
					/>
				}/>
				}   
			</div>
			}

			{modalVisibleUpdatePayment && <div className='payment-modal'>
				{updatePaymentPopupOpen && <Popup
					popupType='updatePaymentPopup'
					handleClose={togglePopupUpdatePayment}
					content={
						<form className='formUpdatePayment' onSubmit={onSubmitUpdatePaymentInputValidation}>
							<label className='paymentFormHeader'>Update Payment</label>

							<br /><br />

							<label className='updatePaymentFormLabelText'>Invoice ID</label>
							<input className='updatePaymentInputInvoiceId' value={pendingUpdate.invoiceId} type='number' name='paymentInvoiceID' disabled/>
							
							<br /><br />

							<label className='updatePaymentFormLabelText'>Receipt ID</label>
							<input className='updatePaymentInputReceiptId' value={pendingUpdate.receiptId} type='number' name='receiptID' disabled/>
							
							<br /><br />

							<label className='updatePaymentFormLabelText'>Payment Type</label>
							<input className='updatePaymentInputPaymentType' value={updatePaymentInput.paymentType} type='text' name='paymentType' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<label className='updatePaymentFormLabelText'>Payment Status</label>
							<input className='updatePaymentInputPaymentStatus' value={updatePaymentInput.paymentStatus} type='text' name='paymentStatus' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<button className='paymentButton'>Submit</button>
							
							<br /><br />

							{updatePaymentSubmitMessageStatus && <label className='paymentFormLabelTextStatus'>{<label className='paymentFormLabelText'>{updatePaymentSubmitMessage}</label>}</label>}
						</form>
					}/>
				}
			</div>
			}
			
			{modalVisibleUpdatePaymentConfirmation && <div className='payment-confirmation-modal'>
				{updatePaymentConfirmationPopupOpen && <Popup
				popupType='updatePaymentConfirmationPopup'
				handleClose={togglePopupUpdatePaymentConfirmation}
				content={
					<ConfirmationPopupContents
					clickStatus={updatePaymentPostDataClicked}
					statusMessage={updatePaymentPostStatusMessage}
					invokeAction={updatePayment}
					xButtonClose={xPopupUpdatePaymentConfirmation}
					closeButton={closePopupUpdatePaymentConfirmation}
					invokeRefresh={()=>{}}
					/>
					}/>
				}   
			</div>
			}

			{modalVisibleDeletePayment && <div className='payment-modal'>
				{deletePaymentPopUpOpen && <Popup
				popupType='deletePaymentPopup'
				handleClose={togglePopupDeletePayment}
				content={
						<form className='formDeletePayment' onSubmit={togglePopupDeletePaymentConfirmation}>
								<label className='paymentFormHeader'>Delete Payment</label>
								<br></br>
								<br></br>

								<label className='deletePaymentFormLabelText'>Invoice ID:&nbsp;&nbsp;</label>
								<label className='deletePaymentFormLabelText'>{pendingDelete.invoiceId}</label>
								<br></br>

								<button className='paymentButton'>Submit</button>
								<br></br>
								<br></br>

								{deletePaymentSubmitMessageStatus ? <label className='formLabelTextStatusDelete'>{<label className='formLabelText'>{deletePaymentSubmitMessage}</label>}</label>:null}
						</form>
				}/>}
				</div>
			}

			{modalVisibleDeletePaymentConfirmation && <div className='payment-confirmation-modal'>
				{deletePaymentConfirmationPopupOpen && <Popup
				popupType='deletePaymentConfirmationPopup'
				handleClose={togglePopupDeletePaymentConfirmation}
				content={
					<ConfirmationPopupContents
					clickStatus={deletePaymentPostDataClicked}
					statusMessage={deletePaymentPostStatusMessage}
					invokeAction={deletePayment}
					xButtonClose={xPopupDeletePaymentConfirmation}
					closeButton={closePopupDeletePaymentConfirmation}
					invokeRefresh={()=>{}}
					/>
					}/>
				}   
			</div>
			}

			<div className="payments-container">
					<h1 className='payment-title'>Payment Logs</h1>
					<table className='payment-table'>
						<tr>
							<th className='payment-table-column'>No.</th>
							<th className='payment-table-column'>Invoice ID</th>
							<th className='payment-table-column'>Receipt ID</th>
							<th className='payment-table-column'>Order No.</th>
							<th className='payment-table-column'>Payment Type</th>
							<th className='payment-table-column'>Payment Status</th>
							<th className='payment-table-column' colSpan='2'>Actions</th>
						</tr>

						<br></br> 
						<br></br> 

						{allPaymentLogsData ? allPaymentLogsData?.map((paymentLogs, index) => {
							return(
								<tr key={paymentLogs.receiptID}>
									<td className='payment-table-column'>{index+1}</td>
									<td className='payment-table-column'>{paymentLogs.paymentInvoiceID}</td>
									<td className='payment-table-column'>{paymentLogs.receiptID}</td>
									<td className='payment-table-column'>{paymentLogs.Receipt.DistinctOrderList.orderNo}</td>
									<td className='payment-table-column'>{paymentLogs.paymentType}</td>
									<td className='payment-table-column'>{paymentLogs.paymentStatus}</td>
									<td className='actionButtons'><UpdateAndDeleteButton buttonText={'Update Payment Log'} setView={() => updateOnClick(paymentLogs.paymentInvoiceID, paymentLogs.receiptID)} setData={() => {}} setId={() => {}}/></td>
									<td className='actionButtons'><UpdateAndDeleteButton buttonText={'Delete Payment Log'} setView={() => deleteOnClick(paymentLogs.paymentInvoiceID)} setData={() => {}} setId={() => {}}/></td>
								</tr>
							)
						}): null
						}
					</table>
			</div>
		</>
	)
}
