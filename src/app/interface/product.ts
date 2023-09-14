export interface IProduct {
    id: number,
    brand: string,
    title: string,
    price: number,
    description: string,
    image: string,
    variants: IProductVariants[],
    quantity: number;
}

export interface IProductVariants {
    ColorId: string,
    ColorName: string,
    HasVideo: false,
    ImageFileName: null,
    ImageFolders: null,
    IsDefault: false,
    ListPrice: null,
    OriginalPrice: null,
    Sizes: IProductSizes[],
    ProductImages: string[],
    SwatchImage: string
}

export interface IProductSizes {
    Available: boolean,
    AvailableBOPIS: boolean,
    FinalSale: any,
    LowStockMessage: any,
    Price: number,
    SizeId: string,
    SizeName: string,
    DisplayName: any,
    Description: any,
    inventories: any
}