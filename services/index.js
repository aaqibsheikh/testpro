import moment from 'moment';
import { format, fromUnixTime, getUnixTime, formatDistance} from 'date-fns';

export const timestampToDate = (baitProfile) => {
    baitProfile.dateOfBirth =
        baitProfile.dateOfBirth === 0 ?
            moment().format('D-MMM-YYYY') :
            moment.unix(baitProfile.dateOfBirth).format('D-MMM-YYYY');
    baitProfile.companyDateEstablishment =
        baitProfile.companyDateEstablishment === 0 ?
            moment().format('D-MMM-YYYY') :
            moment.unix(baitProfile.companyDateEstablishment).format('D-MMM-YYYY');
    baitProfile.dateOfEmployment =
        baitProfile.dateOfEmployment === 0 ?
            moment().format('D-MMM-YYYY') :
            moment.unix(baitProfile.dateOfEmployment).format('D-MMM-YYYY');
    baitProfile.dateJoin =
        baitProfile.dateJoin === 0 ?
            moment().format('D-MMM-YYYY') :
            moment.unix(baitProfile.dateJoin).format('D-MMM-YYYY');
    return baitProfile;
};

export const formatPromoMonthDateYear = (promotion) => {
    promotion.data.filter((promo) => {
        promo.promoStartDate =
            promo.promoStartDate === '0' ?
                'N/A' :
                moment.unix(promo.promoStartDate).format('D-MMM-YYYY');
        promo.promoEndDate =
            promo.promoEndDate === '0' ?
                'N/A':
                moment.unix(promo.promoEndDate).format('D-MMM-YYYY');
    });
    return promotion;
};

export const formatBlogMonthDateYear = (blog) => {
    blog.data.filter((blog => {
        if(blog.createdDate != undefined){
            blog.createdDate =
                blog.createdDate === '0' ?
                    'N/A' :
                    moment.unix(blog.createdDate).format('D-MMM-YYYY');
        }
        if(blog.publishDate != undefined){
            blog.publishDate =
                blog.publishDate === '0' ? 
                    'N/A' : 
                    moment.unix(blog.publishDate).format('D-MMM-YYYY');
        }
    }));
    return blog;
};

export const convertFromUnixTime = (date, defaultStr) => {
    if(date === undefined || date === null || date === 0 || date === '0'){
        if(defaultStr === undefined ){
            return format(new Date(), 'd-MMM-yyyy')
        }
        else{
            return defaultStr;
        }
    }
    else{
        return format(fromUnixTime(date), 'd-MMM-yyyy');
    }
};

export const convertToUnixTime = (date, defaultStr) => {
    if(date === undefined){
        if(defaultStr === undefined ){
            return getUnixTime(format(new Date(), 'd-MMM-yyyy'));
        }
        else{
            return defaultStr;
        }
    }
    else{
        return getUnixTime(new Date(date));
    }
};

// export const formatBlogDateFromPage = (date) => {
//     return date = date === 0 ? moment().format('D-MMM-YYYY') : moment.unix(date).format('D-MMM-YYYY');
// };

export const convertDateForBiteProfile = (biteProfile) => {
    biteProfile.dateJoin = convertFromUnixTime(biteProfile.dateJoin);
        // biteProfile.dateJoin == 0 ?
        //     moment().format('D-MMM-YYYY') :
        //     moment.unix(biteProfile.dateJoin).format('D-MMM-YYYY');
    return biteProfile;
};

export const formatDateMonthYear = (date) => {
    return moment.unix(date).format('D MMM YYYY');
};

export const findDaysAgo = (date) => {
    if (date == undefined || date == '' || date == 0) { return ''; }
    return moment.unix(date).fromNow();
};

export const calculateYears = (date) => {
    var start = moment(moment.unix(date).format('D-MMM-YYYY'));
    var end = moment().format('D-MMM-YYYY');
    var year = moment(end).diff(moment(start), 'years');
    if (year > 1) return `${year} years`;
    else if (year === 1) return `${year} year`;
    else return 'First year';
};

export const calculatePlatformJoinDate = (date) => {
    return moment.unix(date).format('MMM YYYY');
};

export const checkFileType = (file) => {
    if (
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/pdf'
    ) {
        return true;
    }
    return false;
};

export const convertToWhatsappFormat = (mobile) => {
    if (mobile === undefined || mobile === '') {
        return '';
    }
    var newString = mobile.replace(/[\s.*+?^${}()|[\]\\]/g, '');
    var newInt = parseInt(newString);
    return `${newInt}`;
};

export const numberWithCommas = (unformattedString) => {
    if (unformattedString == undefined) {
        return '';
    }
    else if (parseInt(unformattedString)) {
        var amount = unformattedString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${(amount)}`;
    } else {
        return unformattedString;
    }
    // old
    // return unformattedString.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    // method 1
    // return unformattedString.toLocaleString();
    // method 2
};
