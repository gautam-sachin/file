import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function SideBar({ setSideData, setFolderData, arr, setHide }) {
	const [data] = React.useState(JSON.parse(localStorage.getItem('folder')));
	const click = (item, id) => {
		setHide(true);
		setSideData(id);
		item.forEach((i) => {
			if(id === i.id){
				if (i.type === 'folder') {
					i.children.forEach((child) => {
						arr.push(child);
						setFolderData(arr);
					});
				}
			} 
		});
		
	};
 
	//
	const displayTreeView = (data) => {
		if (!data) {
			return 'Empty';
		}
		//
		return data.map((foldersitem) => {  
			const name = foldersitem.type === 'folder' ? foldersitem.name : foldersitem.type;
			const icon = foldersitem.type === 'file' ? <InsertDriveFileIcon /> : <FolderIcon />;
			return (
				<TreeItem
					key={foldersitem.id}
					nodeId={`${foldersitem.id}`}
					label={name}
					icon={icon}
					onClick={() => click(data, foldersitem.id)}
				>
					{displayTreeView(foldersitem.children)}
				</TreeItem>
			);
		});
	};
	//
	return (
		<TreeView
			aria-label="file system navigator"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 580, flexGrow: 1, maxWidth: 200, overflowY: 'auto', color: '#fff' }}
		>
			{displayTreeView(data)}
		</TreeView>
	);
}
