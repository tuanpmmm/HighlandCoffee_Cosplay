module.exports = function formatSlug(string) {
    const nomalize = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const slug = nomalize.replace(/\s+/g, "-");
    return slug;
}