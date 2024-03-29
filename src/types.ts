export interface GoodReadBook {
	imageUrl: string
	bookId: string
	workId: string
	bookUrl: string
	from_search: boolean
	from_srp: boolean
	qid: string
	rank: number
	title: string
	bookTitleBare: string
	numPages: number
	avgRating: string
	ratingsCount: number
	author: GoodReadBookAuthor
	kcrPreviewUrl: any
	description: GoodReadBookDescription
  }
  
  export interface GoodReadBookAuthor {
	id: number
	name: string
	isGoodreadsAuthor: boolean
	profileUrl: string
	worksListUrl: string
  }
  
  export interface GoodReadBookDescription {
	html: string
	truncated: boolean
	fullContentUrl: string
  }
  

export interface RendererData {
	library: LibraryAsset;
	annotation: Annotation[];
}

export interface AnnotationAssetId {
	ZANNOTATIONASSETID: string;
}

export interface LibraryAssetId {
	ZASSETID: string;
}

export interface LibraryAsset {
	Z_PK: number;
	Z_ENT: number;
	Z_OPT: number;
	ZCANREDOWNLOAD: number;
	ZCOMBINEDSTATE: number;
	ZCOMPUTEDRATING: string;
	ZCONTENTTYPE: number;
	ZDESKTOPSUPPORTLEVEL: number;
	ZDIDRUNFORYOUENDOFBOOKEXPERIENCE: string;
	ZDIDWARNABOUTDESKTOPSUPPORT: number;
	ZFILESIZE: number;
	ZGENERATION: number;
	ZHASRACSUPPORT: number;
	ZISDEVELOPMENT: number;
	ZISDOWNLOADINGSUPPLEMENTALCONTENT: string;
	ZISEPHEMERAL: number;
	ZISEXPLICIT: string;
	ZISFINISHED: string;
	ZISHIDDEN: number;
	ZISLOCKED: number;
	ZISNEW: string;
	ZISPROOF: number;
	ZISSAMPLE: number;
	ZISSTOREAUDIOBOOK: string;
	ZISSUPPLEMENTALCONTENT: number;
	ZISTRACKEDASRECENT: number;
	ZMETADATAMIGRATIONVERSION: string;
	ZNOTFINISHED: string;
	ZPAGECOUNT: number;
	ZRATING: number;
	ZSERIESISCLOUDONLY: string;
	ZSERIESISHIDDEN: string;
	ZSERIESNEXTFLAG: string;
	ZSERIESSORTKEY: number;
	ZSORTKEY: number;
	ZSTATE: number;
	ZTASTE: number;
	ZTASTESYNCEDTOSTORE: number;
	ZLOCALONLYSERIESITEMSPARENT: string;
	ZPURCHASEDANDLOCALPARENT: string;
	ZSERIESCONTAINER: string;
	ZSUPPLEMENTALCONTENTPARENT: string;
	ZASSETDETAILSMODIFICATIONDATE: number;
	ZBOOKHIGHWATERMARKPROGRESS: number;
	ZBOOKMARKSSERVERMAXMODIFICATIONDATE: string;
	ZCREATIONDATE: number;
	ZDATEFINISHED: number;
	ZDURATION: number;
	ZEXPECTEDDATE: string;
	ZFILEONDISKLASTTOUCHDATE: string;
	ZLASTENGAGEDDATE: number;
	ZLASTOPENDATE: number;
	ZLOCATIONSERVERMAXMODIFICATIONDATE: string;
	ZMODIFICATIONDATE: number;
	ZPURCHASEDATE: number;
	ZREADINGPROGRESS: number;
	ZRELEASEDATE: string;
	ZUPDATEDATE: number;
	ZVERSIONNUMBER: number;
	ZACCOUNTID: string;
	ZASSETGUID: string;
	ZASSETID: string;
	ZAUTHOR: string;
	ZBOOKDESCRIPTION: string;
	ZBOOKMARKSSERVERVERSION: string;
	ZCOMMENTS: string;
	ZCOVERURL: string;
	ZCOVERWRITINGMODE: string;
	ZDATASOURCEIDENTIFIER: string;
	ZDOWNLOADEDDSID: string;
	ZEPUBID: string;
	ZFAMILYID: string;
	ZGENRE: string;
	ZGROUPING: string;
	ZKIND: string;
	ZLANGUAGE: string;
	ZLOCATIONSERVERVERSION: string;
	ZPAGEPROGRESSIONDIRECTION: string;
	ZPATH: string;
	ZPERMLINK: string;
	ZPURCHASEDDSID: string;
	ZSEQUENCEDISPLAYNAME: string;
	ZSERIESID: string;
	ZSERIESSTACKIDS: string;
	ZSORTAUTHOR: string;
	ZSORTTITLE: string;
	ZSTOREID: string;
	ZSTOREPLAYLISTID: string;
	ZTEMPORARYASSETID: string;
	ZTITLE: string;
	ZVERSIONNUMBERHUMANREADABLE?: string;
	ZYEAR: string;
}

export interface Annotation {
	Z_PK: number;
	Z_ENT: number;
	Z_OPT: number;
	ZANNOTATIONDELETED: number;
	ZANNOTATIONISUNDERLINE: number;
	ZANNOTATIONSTYLE: number;
	ZANNOTATIONTYPE: number;
	ZPLABSOLUTEPHYSICALLOCATION: number;
	ZPLLOCATIONRANGEEND: number;
	ZPLLOCATIONRANGESTART: number;
	ZANNOTATIONCREATIONDATE: number;
	ZANNOTATIONMODIFICATIONDATE: number;
	ZANNOTATIONASSETID: string;
	ZANNOTATIONCREATORIDENTIFIER: string;
	ZANNOTATIONLOCATION: string;
	ZANNOTATIONNOTE: string | null;
	ZANNOTATIONREPRESENTATIVETEXT: string;
	ZANNOTATIONSELECTEDTEXT: string | null;
	ZANNOTATIONUUID: string;
	ZFUTUREPROOFING1: string;
	ZFUTUREPROOFING10: string;
	ZFUTUREPROOFING11: string;
	ZFUTUREPROOFING12: string;
	ZFUTUREPROOFING2: string;
	ZFUTUREPROOFING3: string;
	ZFUTUREPROOFING4: string;
	ZFUTUREPROOFING5: string | null;
	ZFUTUREPROOFING6: string;
	ZFUTUREPROOFING7: string;
	ZFUTUREPROOFING8: string;
	ZFUTUREPROOFING9: string;
	ZPLSTORAGEUUID: string;
	ZPLUSERDATA: string;
}
