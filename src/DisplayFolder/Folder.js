import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FolderIcon from '@mui/icons-material/Folder';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const Folder = ({ 
	data,
	click,
	handleClickOpen,
	handleFileUpload ,
	menu,
	anchorEl1,
	handleRightLeftClick,
	handleClose1,
	sideData,
}) => {
	const [detailMenu, setdetailMenu] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [nextfolder, setNextFolder] = useState(8);
	const [rename, setRename] = useState(false);
	const [dataId, setDataId] = useState();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState();
	const [getData] = useState(data);
	const threeDotMenu = Boolean(anchorEl);
	const dMenu = Boolean(detailMenu);
	console.log(sideData);
	/**
	 * 
	 * @param {*} item 
	 * @param {*} event 
	 */
	const handleClick = (item, event) => {
		setDataId(item.id);
		setName(item.name);
		setAnchorEl(event.currentTarget);
	};
  
	/**
	  * 
	  */
	const handleClose = () => {
		setAnchorEl(null);
		setRename(false);
		setOpen(false);
	};
	/**
	 * 
	 * @param {*} deleteData 
	 * @param {*} nestedData 
	 */
	const handleDelete = (deleteData, nestedData) => {
		setOpen(false);
		setAnchorEl(null);
		deleteData.reduce((a, deleteItem, index) => {
			if (a) {
				return a;
			}
			if (deleteItem.id === dataId) {
				deleteData.splice(index, 1);
			}
			if (deleteItem[nestedData]) return handleDelete(deleteItem[nestedData], nestedData);
		},null);
		localStorage.setItem('folder', JSON.stringify(deleteData));
	};

	/**
	 * 
	 * @param {*} eData 
	 * @param {*} nestedData 
	 */
	const handleEditBtn = (eData, nestedData) => {
		setRename(false);
		setAnchorEl(null);
		const enterName = name;
		eData.reduce((a, itemChild) => {
			if (a) {
				return a;
			}
			if (itemChild.id === dataId) {
				itemChild.name = enterName;
			}
			if (itemChild[nestedData]) return handleEditBtn(itemChild[nestedData], nestedData);
		}, null);
		localStorage.setItem('folder', JSON.stringify(eData));
	};

	/**
	 * 
	 */
	const deleteBtn = () => {
		setOpen(true);
	};

	/**
	 * 
	 */
	const editBtn = () => {
		setRename(true);
	};

	/**
	 * 
	 * @param {*} e 
	 */
	const renameValue = (e) => {
		setName(e.target.value);
	};

	/**
	 * 
	 * @param {*} e 
	 */
	const openDetail = (e) => {
		setdetailMenu(e.currentTarget);
		setAnchorEl(null);
	};

	/**
	 * 
	 */
	const nextData = () => {
		setNextFolder(nextfolder => nextfolder + 1);
	};

	/**
	 * 
	 */
	return (
		<div className="folder">
			<div>
				{data !== null ?
					<div>
						{data.slice(0, nextfolder).map((item) =>
							<div className="cardLeft" key={item.id}>
								<Card id="card" >
									{item.type === 'folder' ? <FolderIcon id="sa" onClick={() => click(item)} /> : <InsertDriveFileIcon id="sa" />}
									<CardHeader
										action={(
											<>
												<IconButton aria-label="settings" onClick={(e) => handleClick(item, e)}>
													<MoreVertIcon id="more" />
												</IconButton>
												<Menu
													id="basic-menu"
													anchorEl={anchorEl}
													open={threeDotMenu}
													onClose={handleClose}
												>
													<MenuItem>Open</MenuItem>
													<MenuItem onClick={openDetail}>Detail</MenuItem>
													<Menu
														id="basic-menu"
														anchorEl={detailMenu}
														open={dMenu}
														onClose={handleClose}
													>
														<MenuItem> Size:{item.name.length} MB</MenuItem>
														<MenuItem> Type: {item.type}</MenuItem>
														<MenuItem>Open</MenuItem>
													</Menu>
													<MenuItem onClick={editBtn}>Rename</MenuItem>
													<Dialog
														open={rename}
														onClose={handleClose}
														aria-labelledby="alert-dialog-title"
														aria-describedby="alert-dialog-description"
													>
														<DialogTitle id="alert-dialog-title">
															{' Are you sure ?'}
														</DialogTitle>
														<DialogContent>
															<TextField
																autoFocus
																margin="dense"
																id="name"
																label="Rename Folder"
																type="Folder"
																fullWidth
																variant="standard"
																value={name}
																onChange={renameValue}
															/>
														</DialogContent>
														<DialogActions>
															<Button onClick={handleClose}>Cencel</Button>
															<Button onClick={() => handleEditBtn(getData, 'children')} autoFocus>
                                                                    Rename
															</Button>
														</DialogActions>
													</Dialog>
													<MenuItem onClick={deleteBtn}>
                                                            Delete1
													</MenuItem>
													<Dialog
														open={open}
														onClose={handleClose}
														aria-labelledby="alert-dialog-title"
														aria-describedby="alert-dialog-description"
													>
														<DialogTitle id="alert-dialog-title">
															{' Are you sure ?'}
														</DialogTitle>
														<DialogContent>
															<DialogContentText id="alert-dialog-description">
                                                                    This will permanenlty delete Folder
															</DialogContentText>
														</DialogContent>
														<DialogActions>
															<Button onClick={handleClose}>Cencel</Button>
															<Button onClick={()=> handleDelete(getData, 'children')} autoFocus>
                                                                    Delete
															</Button>
														</DialogActions>
													</Dialog>
												</Menu>
											</>
										)}
										id="header"
										title={(
											<Typography id="title">
												{item.type === 'folder' ? item.name : item.type}
											</Typography>
										)}
										subheader={(
											<Typography id="title1">
												{item.date}
											</Typography>
										)}
									/>
								</Card>
							</div>
						)}
					</div>
					: ''}
				<div>
					<div>
						<span className="icon"><i className="fa fa-plus-circle" onClick={handleRightLeftClick} onContextMenu={handleRightLeftClick} /></span>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl1}
							open={menu}
							onClose={handleClose1}
						>
							<MenuItem onClick={handleClickOpen}>Create Folder</MenuItem>
							<MenuItem onClick={handleFileUpload}>Upload File</MenuItem>
						</Menu>
					</div>
				</div>
				{data.length > 8 ?
					<div className="paginatin">
						<button type="button" className="nextBtn" onClick={nextData}>LoadMore..</button>
					</div> 
					: '' }
			</div>
		</div>
	);
};

export default Folder;