													React use Typescript CRUD simple app for events
												This is the React use Typescript CRUD simple app for events

   About The Project

<img width="1439" alt="Screen Shot 2024-07-24 at 7 49 38 AM" src="https://github.com/user-attachments/assets/894d8505-3c99-4915-a84f-8c68615641a4">

Built With

-- Server

	NodeJS 
	koa
	Mongoose

-- Client
	
	Typescript
	React
 	material-ui
  
--Folder structure
`-Redux Configuration
	`reducers folder : contains redux state management 
 
	`Types folder :contains interface declaration for state actions 
		Usage: fetchReload state used to automatically reload events list after (adding , updating, deleting) an event
			const refreshState: any = useSelector(
			       state: RootState) => state.payload.reloadFetch
			 );
			dispatchData({
			   type: "SET_FETCH_RELOAD_DATA",
			    payload: !refreshState,
			             });
	`Pages Folder
		Contains all project implemented components
  
	`Auth : contain user login and register form 
	`protected .tsx : to protect routes if the user not logged in
	`Anonymous.tsx: allow routes like login and register to be accessible
 
	`Events: contain event provider to manage common data (to avoid code duplication)
		Same form for add and update event
		Add comment modal can be either opened from event list or event details using the event provider 
		Components folder : contains all events pages components
  
	`Components : contains general components like toaster and table
	`Toaster : general component to alert success messages for user 

	`Services Folder
        Contain all endpoints (used Axios) to handle async http requests to the backend


