import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Folder from '../DisplayFolder/Folder';
import SideBar from '../SIdeBar/SideBar';

const getData = () => {
	const data = localStorage.getItem('folder');
	if (data) {
		return JSON.parse(data);
	}
	return [];
};

const Header = () => {
	const [data] = useState(getData());
	const [inputValue, setInputValue] = useState('');
	const [anchorEl1, setAnchorEl1] = useState(null);
	const [file, setFile] = useState('');
	const [fId, setFId] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [openFileBox, setOpenFileBox] = useState(false);
	const [allItem, setAllItem] = useState();
	const [sideData, setSideData] = useState();
	const [folderData, setFolderData] = useState(data);
	const open1 = Boolean(anchorEl);
	const open2 = Boolean(anchorEl1);
	const arr = []; 
	const [hide, setHide] = useState(false);
	console.log(folderData);
	console.log(hide);
	//
	const handleClickSortBtn = (event) => {
		setAnchorEl(event.currentTarget);
	};
	//
	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};
	const handleClosefilebox = () => {
		setAnchorEl(null);
		setOpenFileBox(false);
	};

	//
	const handleClickOpen = () => {
		setOpen(true);
		setAnchorEl1(null);
	};
	const handleFileUpload = () => {
		setOpenFileBox(true);
		setAnchorEl1(null);
	};

	//
	const inputBox = (e) => {
		setInputValue(e.target.value);
	};

	//
	useEffect(() => {
		localStorage.setItem('folder', JSON.stringify(data));
	}, [data]);
	//
	const save = (data, nestedData) => {
		setAnchorEl(null);
		setOpen(false);
		const value = {
			type: 'folder',
			id: Math.floor(Math.random() * 100),
			name: inputValue !== '' ? inputValue : '< No Name >',
			date: new Date().toLocaleDateString(),
			children: [],
		};
		if (!fId) {
			data.push(value);
			localStorage.setItem('folder', JSON.stringify(data));
		} else {
			data.reduce((a, items) => {
				if (a) {
					return a;
				}
				if (items.id === fId) {
					items.children.push(value);
				}
				if (items[nestedData]) return save(items[nestedData], nestedData);
			}, null);
			localStorage.setItem('folder', JSON.stringify(data));
			// console.log(data);			
		}
		setInputValue('');
	};

	const fileUploadBtn = (data, nestedData) => {
		setAnchorEl(null);
		setOpenFileBox(false);
		const value = {
			type: 'file',
			id: Math.floor(Math.random() * 100),
			name: file !== '' ? file : '< No Name >', 
			date: new Date().toLocaleDateString(),
			children: [],
		};
		if (!fId) {
			data.push(value);
			localStorage.setItem('folder', JSON.stringify(data));
		} else {
			data.reduce((a, items) => {
				if (a) {
					return a;
				}
				if (items.id === fId) {
					items.children.push(value);
				}
				if (items[nestedData]) return save(items[nestedData], nestedData);
			}, null);
			localStorage.setItem('folder', JSON.stringify(data));
		}
	};

	const fileUpload = (e) => {
		const filePath = e.target;
		const reader = new FileReader();
		reader.readAsDataURL(filePath.files[0]);
		reader.onload = () => {
			setFile(reader.result);
		};
		reader.onerror = () => {
		};
	};

	//
	const click = (item) => {
		setFId(item.id);
		setAllItem(item.name);
		setFolderData(item.children);
	};

	//
	const SortByAlpha = () => {
		setAnchorEl(null);
		const newSort = allItem;
		const sorting = newSort.sort((a, b) => a.name.localeCompare(b.name));
		setAllItem(sorting);
	};

	//
	const SortByAlphaDeasc = () => {
		setAnchorEl(null);
		const newSort = allItem;
		const sort = newSort.sort((a, b) => a.name > b.name ? -1 : 1);
		setAllItem(sort);
	};
	useEffect(() => {
		localStorage.setItem('folder', JSON.stringify(data));
		setAllItem(data);
	}, [data]);

	//
	const handleRightLeftClick = (e) => {
		e.preventDefault();
		if (e.type === 'click') {
			handleFileUpload();
		} else if (e.type === 'contextmenu') {
			setAnchorEl1(e.currentTarget);
		}
	};
	const handleClose1 = () => {
		setAnchorEl1(null);
	};

	//
	return (
		<>
			<div className="main">
				<div>
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
						<div className="container-fluid">
							<span className="navbar-brand">File Manager</span>
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<button className="btn btn-outline-success me-2" onClick={handleClickOpen}>Folder Create</button>
									<Dialog open={open} onClose={handleClose}>
										<DialogTitle>Create Folder</DialogTitle>
										<DialogContent>
											<DialogContentText>
											</DialogContentText>
											<TextField
												margin="dense"
												id="name"
												label="Create Folder"
												type="Folder"
												fullWidth
												variant="standard"
												value={inputValue}
												onChange={inputBox} />
										</DialogContent>
										<DialogActions>
											<Button onClick={handleClose}>Cancel</Button>
											<Button onClick={() => save(data, 'children')}>Create</Button>
										</DialogActions>
									</Dialog>
									<Stack direction="row" alignItems="center" spacing={2}>
										<Button variant="contained" component="label" onClick={handleFileUpload}>
											file Upload
										</Button>
										<Dialog open={openFileBox} onClose={handleClosefilebox}>
											<DialogTitle>file Upload</DialogTitle>
											<DialogContent>
												<DialogContentText>
												</DialogContentText>
												<TextField
													autoFocus
													margin="dense"
													id="name"
													label="file Upload"
													type="file"
													fullWidth
													variant="standard"
													accept="image/*"
													onChange={fileUpload} />
											</DialogContent>
											<DialogActions>
												<Button onClick={handleClosefilebox}>Cancel</Button>
												<Button onClick={() => fileUploadBtn(data, 'children')}>File Upload</Button>
											</DialogActions>
										</Dialog>
									</Stack>
									<li className="nav-item">
									</li>
								</ul>

								<button className="sort  bg-dark me-2" onClick={handleClickSortBtn}>
									SortBy
									<ArrowDropDownIcon />
								</button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={open1}
									onClose={handleClose}
								>
									<MenuItem onClick={SortByAlpha}>Name(Asc)</MenuItem>
									<MenuItem onClick={SortByAlphaDeasc}>Name(Desc)</MenuItem>
								</Menu>
							</div>
						</div>
					</nav>
				</div>
				<div className="inner">
					<div className="side">
						<SideBar setSideData={setSideData} arr={arr}  setFolderData={setFolderData} setHide={setHide} />
					</div>
					<div className="side1">
						<Folder data={sideData ? folderData : folderData} sideData={sideData} click={click} handleFileUpload={handleFileUpload}
							handleClose1={handleClose1} handleClickOpen={handleClickOpen} handleRightLeftClick={handleRightLeftClick} anchorEl1={anchorEl1} menu={open2} />
					</div>
				</div>
			</div>
		</>
	);
};
export default Header;