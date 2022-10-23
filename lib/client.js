import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId:  "h109wipw",
    dataset:    'production',
    apiVersion: "2022-10-22",
    useCdn:     true,
    token:      "skYP2BDjbNEhtdcnZRfIjzXiTk9UkaxDgZONR4nCg6SaxDnlSMCCFT1uvqw1Ks262MxV2ZuNBHjGosbq1BOwdaHgGOyJYm8T5cv97YIJB4AZvAZtgGStyItrMTt3Xj0msvI5sCWldLl8MKYqwqn4Qxz87rTlgdoD98DpFS4rIUxVox1q6nBn"
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)