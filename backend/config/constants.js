var APP = {

	//***** Common *****//
	CONTEXT_PATH : '/ENS',
	ENV : 'DEV',
	DEFAULT_PAGING : {
		sortBy : [],
		totalItems : 0,
		limit : 15,
		pageNumber : 1,
		showing : {
			start : 0,
			end : 0,
			total : 0
		}
	},
	DATE_FORMAT : 'YYYY-MM-DD',
	//***** Traveling Expense *****//
	TRAVEL_OVERSEA : 'O',
	TRAVEL_DOMESTIC : 'D',
	TRAVEL_DOMESTIC_INBOUND : 'I',
	TRAVEL_DOMESTIC_OUTBOUND : 'O',
	TOKEN:'ec96817c22ca183cc16b13cc995d4157'


	DUMMY : 'DUMMY'

};

APP.UPLOAD_URL = APP.CONTEXT_PATH + '/upload';

APP.TABLE_DRAF = 8;
