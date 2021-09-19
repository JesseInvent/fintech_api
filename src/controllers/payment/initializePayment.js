import asyncHandler from "../../utils/asyncHandler.js";


export default asyncHandler( async (req, res, next) => {
    
    const paymentPageUrl = process.env.PAYSTACK_PAYMENT_PAGE_URL

    res.status(202).json({
        status: 'success',
        payment_url: paymentPageUrl
    })
    
})