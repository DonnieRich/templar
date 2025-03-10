export const scope = 'DonnieRich';
export const starterKits = [
    'vue'
];

export function allowedPackages() {
    return starterKits.map(kit => `${scope}/${kit}-starter-kit`);
}