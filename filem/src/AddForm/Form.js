import React from 'react';

export default function Form() {
	var folders = [
		{
			id: '1',
			name: 'folder',
			description: 'discription',
			subFolders: [
				{
					id: '2',
					name: 'f1',
					description: 'desc',
					subFolders: [
						{
							id: '3',
							name: 'f2',
							description: 'desc',
							subFolders:[]
						}
					],
					
				},
				{
					id: '7',
					name: 'f3',
					description: 'desc',
					subFolders: [
						{
							id: '8',
							name: 'f4',
							description: 'desc',
							subFolders:[]
						}
					],
					
				}
			]
		},
		{
			id: '4',
			name: 'folder1',
			description: 'discription',
			subFolders: [
				{
					id: '5',
					name: 'f1',
					description: 'desc',
					subFolders: [
						{
							id: '6',
							name: 'f2',
							description: 'desc',
							subFolders:[]
						}
					]
				}]
		}
	];
	localStorage.setItem('folder', JSON.stringify(folders));
	return (
		<div>sdmfug</div>
	);
}
