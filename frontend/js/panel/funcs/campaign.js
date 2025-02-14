import { getToken, showSwal } from "../../funcs/utils.js"

const createNewCampaignPercent = async () => {
    const campaignPercentInput = document.querySelector('#campaign-percent-input')

    const res = await fetch(`http://localhost:4000/v1/offs/all`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ discount: campaignPercentInput.value })
    })

    if (res.ok) {
        showSwal('کمپین تخفیف با موفقیت ثبت شد', 'success', 'Ok', () => { })
        campaignPercentInput.innerHTML = ''
    }


}



export {
    createNewCampaignPercent,
}