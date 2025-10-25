// API configuration
const API_BASE_URL = 'https://api.techcompare.com/v1';
const LOCAL_STORAGE_KEY = 'techcompare_data';

// Enhanced fallback data with 10+ products in each category
const fallbackProducts = [
    // ========== DESKTOP CPUs (15 products) ==========
    {
        "id": 1,
        "name": "Intel 8086",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "1978-06-08",
        "architecture": "x86",
        "cores": 1,
        "threads": 1,
        "clock": 0.005,
        "boost_clock": 0.005,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 3000,
        "TDP": 1,
        "memory_support": "",
        "price_MSRP": 360,
        "status": "Discontinued",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "",
            "cache": "",
            "pcie": "N/A",
            "memory_channels": 1
        },
        "sources": ["https://www.intel.com/ark/intel-8086"],
        "description": "Intel's first x86 processor"
    },
    {
        "id": 2,
        "name": "Intel Pentium",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "1993-03-22",
        "architecture": "P5",
        "cores": 2,
        "threads": 2,
        "clock": 0.06,
        "boost_clock": 0.06,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 800,
        "TDP": 60,
        "memory_support": "",
        "price_MSRP": 878,
        "status": "Discontinued",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "",
            "cache": "",
            "pcie": "N/A",
            "memory_channels": 1
        },
        "sources": ["https://www.intel.com/ark/intel-pentium"],
        "description": "Classic Intel processor that defined an era"
    },
    {
        "id": 3,
        "name": "AMD Ryzen 9 7950X",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2022-09-27",
        "architecture": "Zen 4",
        "cores": 16,
        "threads": 32,
        "clock": 4.5,
        "boost_clock": 5.7,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 5,
        "TDP": 170,
        "memory_support": "DDR5-5200",
        "price_MSRP": 699,
        "status": "Released",
        "benchmarks": {
            "single_core": 2100,
            "multi_core": 38000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM5",
            "cache": "80MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-9-7950x"],
        "description": "AMD's flagship desktop processor with Zen 4 architecture"
    },
    {
        "id": 4,
        "name": "Intel Core i9-13900K",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "2022-10-20",
        "architecture": "Raptor Lake",
        "cores": 24,
        "threads": 32,
        "clock": 3.0,
        "boost_clock": 5.8,
        "GPU": "UHD Graphics 770",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 125,
        "memory_support": "DDR5-5600",
        "price_MSRP": 589,
        "status": "Released",
        "benchmarks": {
            "single_core": 2200,
            "multi_core": 41000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LGA 1700",
            "cache": "36MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/230491/intel-core-i913900k-processor-36m-cache-up-to-5-80-ghz/specifications.html"],
        "description": "Intel's high-performance desktop processor with hybrid architecture"
    },
    {
        "id": 5,
        "name": "AMD Ryzen 9 9950X",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2024-08-15",
        "architecture": "Zen 5",
        "cores": 16,
        "threads": 32,
        "clock": 4.3,
        "boost_clock": 5.7,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 4,
        "TDP": 170,
        "memory_support": "DDR5-5600",
        "price_MSRP": 699,
        "status": "Released",
        "benchmarks": {
            "single_core": 2300,
            "multi_core": 42000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM5",
            "cache": "80MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-9-9950x"],
        "description": "AMD's next-generation flagship desktop processor"
    },
    {
        "id": 6,
        "name": "Intel Core i7-14700K",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "2023-10-17",
        "architecture": "Raptor Lake Refresh",
        "cores": 20,
        "threads": 28,
        "clock": 3.4,
        "boost_clock": 5.6,
        "GPU": "UHD Graphics 770",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 125,
        "memory_support": "DDR5-5600",
        "price_MSRP": 409,
        "status": "Released",
        "benchmarks": {
            "single_core": 2100,
            "multi_core": 35000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LGA 1700",
            "cache": "33MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i714700k-processor-33m-cache-up-to-5-60-ghz/specifications.html"],
        "description": "High-performance desktop processor for gaming and content creation"
    },
    {
        "id": 7,
        "name": "AMD Ryzen 7 7800X3D",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2023-04-06",
        "architecture": "Zen 4",
        "cores": 8,
        "threads": 16,
        "clock": 4.2,
        "boost_clock": 5.0,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 5,
        "TDP": 120,
        "memory_support": "DDR5-5200",
        "price_MSRP": 449,
        "status": "Released",
        "benchmarks": {
            "single_core": 1900,
            "multi_core": 18000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM5",
            "cache": "104MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-7-7800x3d"],
        "description": "Gaming-focused processor with 3D V-Cache technology"
    },
    {
        "id": 8,
        "name": "Intel Core i5-14600K",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "2023-10-17",
        "architecture": "Raptor Lake Refresh",
        "cores": 14,
        "threads": 20,
        "clock": 3.5,
        "boost_clock": 5.3,
        "GPU": "UHD Graphics 770",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 125,
        "memory_support": "DDR5-5600",
        "price_MSRP": 319,
        "status": "Released",
        "benchmarks": {
            "single_core": 1900,
            "multi_core": 20000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LGA 1700",
            "cache": "24MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i514600k-processor-24m-cache-up-to-5-30-ghz/specifications.html"],
        "description": "Excellent price-to-performance mid-range desktop processor"
    },
    {
        "id": 9,
        "name": "AMD Ryzen 5 7600X",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2022-09-27",
        "architecture": "Zen 4",
        "cores": 6,
        "threads": 12,
        "clock": 4.7,
        "boost_clock": 5.3,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 5,
        "TDP": 105,
        "memory_support": "DDR5-5200",
        "price_MSRP": 299,
        "status": "Released",
        "benchmarks": {
            "single_core": 2000,
            "multi_core": 12000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM5",
            "cache": "38MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-5-7600x"],
        "description": "Entry-level Zen 4 processor with strong single-core performance"
    },
    {
        "id": 10,
        "name": "Intel Core i3-14100",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "2024-01-08",
        "architecture": "Raptor Lake Refresh",
        "cores": 4,
        "threads": 8,
        "clock": 3.5,
        "boost_clock": 4.7,
        "GPU": "UHD Graphics 730",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 60,
        "memory_support": "DDR5-4800",
        "price_MSRP": 134,
        "status": "Released",
        "benchmarks": {
            "single_core": 1600,
            "multi_core": 6500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LGA 1700",
            "cache": "12MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/236744/intel-core-i314100-processor-12m-cache-up-to-4-70-ghz/specifications.html"],
        "description": "Budget-friendly desktop processor for everyday computing"
    },
    {
        "id": 11,
        "name": "AMD Ryzen 3 7300X",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2023-09-15",
        "architecture": "Zen 4",
        "cores": 4,
        "threads": 8,
        "clock": 4.0,
        "boost_clock": 5.0,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 5,
        "TDP": 65,
        "memory_support": "DDR5-5200",
        "price_MSRP": 149,
        "status": "Released",
        "benchmarks": {
            "single_core": 1700,
            "multi_core": 7000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM5",
            "cache": "18MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-3-7300x"],
        "description": "Entry-level AM5 processor for budget builds"
    },
    {
        "id": 12,
        "name": "Intel Core i9-14900K",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "2023-10-17",
        "architecture": "Raptor Lake Refresh",
        "cores": 24,
        "threads": 32,
        "clock": 3.2,
        "boost_clock": 6.0,
        "GPU": "UHD Graphics 770",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 125,
        "memory_support": "DDR5-5600",
        "price_MSRP": 589,
        "status": "Released",
        "benchmarks": {
            "single_core": 2300,
            "multi_core": 42000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LGA 1700",
            "cache": "36MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i914900k-processor-36m-cache-up-to-6-00-ghz/specifications.html"],
        "description": "Intel's fastest desktop processor with 6.0 GHz boost"
    },
    {
        "id": 13,
        "name": "AMD Threadripper 7980X",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2023-11-21",
        "architecture": "Zen 4",
        "cores": 64,
        "threads": 128,
        "clock": 3.2,
        "boost_clock": 5.1,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 5,
        "TDP": 350,
        "memory_support": "DDR5-5200",
        "price_MSRP": 4999,
        "status": "Released",
        "benchmarks": {
            "single_core": 1800,
            "multi_core": 85000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "TR5",
            "cache": "256MB",
            "pcie": "5.0",
            "memory_channels": 4
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-threadripper-7980x"],
        "description": "Extreme workstation processor for professional workloads"
    },
    {
        "id": 14,
        "name": "Intel Xeon w9-3495X",
        "vendor": "Intel",
        "category": "Desktop CPU",
        "release_date": "2023-02-15",
        "architecture": "Sapphire Rapids",
        "cores": 56,
        "threads": 112,
        "clock": 1.9,
        "boost_clock": 4.8,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 10,
        "TDP": 350,
        "memory_support": "DDR5-4800",
        "price_MSRP": 5889,
        "status": "Released",
        "benchmarks": {
            "single_core": 1500,
            "multi_core": 78000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LGA 4677",
            "cache": "105MB",
            "pcie": "5.0",
            "memory_channels": 8
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232021/intel-xeon-w93495x-processor-105m-cache-1-90-ghz/specifications.html"],
        "description": "Workstation processor for extreme professional workloads"
    },
    {
        "id": 15,
        "name": "AMD Ryzen 7 5700X",
        "vendor": "AMD",
        "category": "Desktop CPU",
        "release_date": "2022-04-04",
        "architecture": "Zen 3",
        "cores": 8,
        "threads": 16,
        "clock": 3.4,
        "boost_clock": 4.6,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 65,
        "memory_support": "DDR4-3200",
        "price_MSRP": 299,
        "status": "Released",
        "benchmarks": {
            "single_core": 1600,
            "multi_core": 14000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM4",
            "cache": "36MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/cpu/amd-ryzen-7-5700x"],
        "description": "Efficient 8-core processor for AM4 platform"
    },

    // ========== LAPTOP CPUs (15 products) ==========
    {
        "id": 101,
        "name": "Intel Core Duo T2300",
        "vendor": "Intel",
        "category": "Laptop CPU",
        "release_date": "2006-01-05",
        "architecture": "Yonah",
        "cores": 2,
        "threads": 2,
        "clock": 1.66,
        "boost_clock": 1.66,
        "GPU": "Integrated",
        "NPU": "N/A",
        "process_node_nm": 65,
        "TDP": 31,
        "memory_support": "DDR2-667",
        "price_MSRP": 241,
        "status": "Discontinued",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "BGA",
            "cache": "2MB",
            "pcie": "N/A",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/ark/intel-core-duo-t2300"],
        "description": "Early Intel dual-core mobile processor"
    },
    {
        "id": 102,
        "name": "Apple M1 (MacBook Air)",
        "vendor": "Apple",
        "category": "Laptop CPU",
        "release_date": "2020-11-10",
        "architecture": "Apple Silicon",
        "cores": 8,
        "threads": 8,
        "clock": 3.2,
        "boost_clock": 3.2,
        "GPU": "7-core",
        "NPU": "16-core",
        "process_node_nm": 5,
        "TDP": 10,
        "memory_support": "LPDDR4X-4266",
        "price_MSRP": 999,
        "status": "Released",
        "benchmarks": {
            "single_core": 1700,
            "multi_core": 7500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "16MB",
            "pcie": "4.0",
            "memory_channels": 2,
            "neural_engine": "16-core"
        },
        "sources": ["https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/"],
        "description": "Apple's first ARM-based processor for Mac"
    },
    {
        "id": 103,
        "name": "AMD Ryzen 9 7945HX",
        "vendor": "AMD",
        "category": "Laptop CPU",
        "release_date": "2023-01-10",
        "architecture": "Zen 4",
        "cores": 16,
        "threads": 32,
        "clock": 2.5,
        "boost_clock": 5.4,
        "GPU": "Radeon 610M",
        "NPU": "N/A",
        "process_node_nm": 5,
        "TDP": 55,
        "memory_support": "DDR5-5200",
        "price_MSRP": 999,
        "status": "Released",
        "benchmarks": {
            "single_core": 2000,
            "multi_core": 30000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "FL1",
            "cache": "64MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/apu/amd-ryzen-9-7945hx"],
        "description": "AMD's flagship mobile processor for high-performance laptops"
    },
    {
        "id": 104,
        "name": "Intel Core i9-13980HX",
        "vendor": "Intel",
        "category": "Laptop CPU",
        "release_date": "2023-01-03",
        "architecture": "Raptor Lake",
        "cores": 24,
        "threads": 32,
        "clock": 2.2,
        "boost_clock": 5.6,
        "GPU": "UHD Graphics",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 55,
        "memory_support": "DDR5-5600",
        "price_MSRP": 668,
        "status": "Released",
        "benchmarks": {
            "single_core": 2100,
            "multi_core": 32000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "BGA1964",
            "cache": "36MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i913980hx-processor-36m-cache-up-to-5-60-ghz/specifications.html"],
        "description": "Intel's fastest mobile processor for gaming laptops"
    },
    {
        "id": 105,
        "name": "Apple M2 Pro",
        "vendor": "Apple",
        "category": "Laptop CPU",
        "release_date": "2023-01-17",
        "architecture": "Apple Silicon",
        "cores": 12,
        "threads": 12,
        "clock": 3.5,
        "boost_clock": 3.7,
        "GPU": "19-core",
        "NPU": "16-core",
        "process_node_nm": 5,
        "TDP": 30,
        "memory_support": "LPDDR5-6400",
        "price_MSRP": 1299,
        "status": "Released",
        "benchmarks": {
            "single_core": 1950,
            "multi_core": 15000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "24MB",
            "pcie": "4.0",
            "memory_channels": 2,
            "neural_engine": "16-core"
        },
        "sources": ["https://www.apple.com/newsroom/2023/01/apple-unveils-new-macbook-pro-with-m2-pro-and-m2-max/"],
        "description": "Apple's professional-grade processor for MacBook Pro"
    },
    {
        "id": 106,
        "name": "AMD Ryzen 7 7840U",
        "vendor": "AMD",
        "category": "Laptop CPU",
        "release_date": "2023-05-03",
        "architecture": "Zen 4",
        "cores": 8,
        "threads": 16,
        "clock": 3.3,
        "boost_clock": 5.1,
        "GPU": "Radeon 780M",
        "NPU": "Ryzen AI",
        "process_node_nm": 4,
        "TDP": 28,
        "memory_support": "LPDDR5X-7500",
        "price_MSRP": 450,
        "status": "Released",
        "benchmarks": {
            "single_core": 1800,
            "multi_core": 12000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "FP8",
            "cache": "24MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/apu/amd-ryzen-7-7840u"],
        "description": "AMD's efficient laptop processor with integrated RDNA 3 graphics"
    },
    {
        "id": 107,
        "name": "Intel Core i7-13700H",
        "vendor": "Intel",
        "category": "Laptop CPU",
        "release_date": "2023-01-01",
        "architecture": "Raptor Lake",
        "cores": 14,
        "threads": 20,
        "clock": 2.4,
        "boost_clock": 5.0,
        "GPU": "Iris Xe Graphics",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 45,
        "memory_support": "DDR5-5200",
        "price_MSRP": 457,
        "status": "Released",
        "benchmarks": {
            "single_core": 1800,
            "multi_core": 15000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "BGA1744",
            "cache": "24MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i713700h-processor-24m-cache-up-to-5-00-ghz/specifications.html"],
        "description": "Intel's high-performance mobile processor for gaming laptops"
    },
    {
        "id": 108,
        "name": "Apple M3 Max",
        "vendor": "Apple",
        "category": "Laptop CPU",
        "release_date": "2023-10-30",
        "architecture": "Apple Silicon",
        "cores": 16,
        "threads": 16,
        "clock": 4.1,
        "boost_clock": 4.1,
        "GPU": "40-core",
        "NPU": "16-core",
        "process_node_nm": 3,
        "TDP": 45,
        "memory_support": "LPDDR5-6400",
        "price_MSRP": 1999,
        "status": "Released",
        "benchmarks": {
            "single_core": 2200,
            "multi_core": 21000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "48MB",
            "pcie": "4.0",
            "memory_channels": 2,
            "neural_engine": "16-core"
        },
        "sources": ["https://www.apple.com/newsroom/2023/10/apple-unveils-new-macbook-pro-with-m3-chips/"],
        "description": "Apple's most powerful mobile processor for professional workflows"
    },
    {
        "id": 109,
        "name": "AMD Ryzen 5 7640U",
        "vendor": "AMD",
        "category": "Laptop CPU",
        "release_date": "2023-05-03",
        "architecture": "Zen 4",
        "cores": 6,
        "threads": 12,
        "clock": 3.5,
        "boost_clock": 4.9,
        "GPU": "Radeon 760M",
        "NPU": "Ryzen AI",
        "process_node_nm": 4,
        "TDP": 28,
        "memory_support": "LPDDR5X-6400",
        "price_MSRP": 350,
        "status": "Released",
        "benchmarks": {
            "single_core": 1700,
            "multi_core": 9000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "FP8",
            "cache": "22MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/apu/amd-ryzen-5-7640u"],
        "description": "Mid-range mobile processor with excellent efficiency"
    },
    {
        "id": 110,
        "name": "Intel Core i5-13500H",
        "vendor": "Intel",
        "category": "Laptop CPU",
        "release_date": "2023-01-01",
        "architecture": "Raptor Lake",
        "cores": 12,
        "threads": 16,
        "clock": 2.6,
        "boost_clock": 4.7,
        "GPU": "Iris Xe Graphics",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 45,
        "memory_support": "DDR5-5200",
        "price_MSRP": 311,
        "status": "Released",
        "benchmarks": {
            "single_core": 1600,
            "multi_core": 12000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "BGA1744",
            "cache": "18MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i513500h-processor-18m-cache-up-to-4-70-ghz/specifications.html"],
        "description": "Mainstream mobile processor for everyday laptops"
    },
    {
        "id": 111,
        "name": "AMD Ryzen 3 7440U",
        "vendor": "AMD",
        "category": "Laptop CPU",
        "release_date": "2023-05-03",
        "architecture": "Zen 4",
        "cores": 4,
        "threads": 8,
        "clock": 3.0,
        "boost_clock": 4.7,
        "GPU": "Radeon 740M",
        "NPU": "Ryzen AI",
        "process_node_nm": 4,
        "TDP": 28,
        "memory_support": "LPDDR5X-6400",
        "price_MSRP": 250,
        "status": "Released",
        "benchmarks": {
            "single_core": 1500,
            "multi_core": 6000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "FP8",
            "cache": "12MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/apu/amd-ryzen-3-7440u"],
        "description": "Entry-level mobile processor for budget laptops"
    },
    {
        "id": 112,
        "name": "Intel Core i3-1315U",
        "vendor": "Intel",
        "category": "Laptop CPU",
        "release_date": "2023-01-01",
        "architecture": "Raptor Lake",
        "cores": 6,
        "threads": 8,
        "clock": 1.2,
        "boost_clock": 4.5,
        "GPU": "UHD Graphics",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 15,
        "memory_support": "DDR4-3200",
        "price_MSRP": 281,
        "status": "Released",
        "benchmarks": {
            "single_core": 1300,
            "multi_core": 5000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "BGA1744",
            "cache": "10MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i31315u-processor-10m-cache-up-to-4-50-ghz/specifications.html"],
        "description": "Entry-level mobile processor for basic computing"
    },
    {
        "id": 113,
        "name": "AMD Ryzen 9 7940HS",
        "vendor": "AMD",
        "category": "Laptop CPU",
        "release_date": "2023-05-03",
        "architecture": "Zen 4",
        "cores": 8,
        "threads": 16,
        "clock": 4.0,
        "boost_clock": 5.2,
        "GPU": "Radeon 780M",
        "NPU": "Ryzen AI",
        "process_node_nm": 4,
        "TDP": 35,
        "memory_support": "DDR5-5600",
        "price_MSRP": 549,
        "status": "Released",
        "benchmarks": {
            "single_core": 1900,
            "multi_core": 14000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "FP8",
            "cache": "24MB",
            "pcie": "4.0",
            "memory_channels": 2
        },
        "sources": ["https://www.amd.com/en/products/apu/amd-ryzen-9-7940hs"],
        "description": "High-performance mobile processor for gaming laptops"
    },
    {
        "id": 114,
        "name": "Intel Core i7-13650HX",
        "vendor": "Intel",
        "category": "Laptop CPU",
        "release_date": "2023-01-01",
        "architecture": "Raptor Lake",
        "cores": 14,
        "threads": 20,
        "clock": 2.6,
        "boost_clock": 4.9,
        "GPU": "UHD Graphics",
        "NPU": "N/A",
        "process_node_nm": 7,
        "TDP": 55,
        "memory_support": "DDR5-4800",
        "price_MSRP": 485,
        "status": "Released",
        "benchmarks": {
            "single_core": 1700,
            "multi_core": 14000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "BGA1964",
            "cache": "24MB",
            "pcie": "5.0",
            "memory_channels": 2
        },
        "sources": ["https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i713650hx-processor-24m-cache-up-to-4-90-ghz/specifications.html"],
        "description": "Performance mobile processor for content creation"
    },
    {
        "id": 115,
        "name": "Apple M4 (MacBook Air)",
        "vendor": "Apple",
        "category": "Laptop CPU",
        "release_date": "2024-05-07",
        "architecture": "Apple Silicon",
        "cores": 10,
        "threads": 10,
        "clock": 4.4,
        "boost_clock": 4.4,
        "GPU": "10-core",
        "NPU": "16-core",
        "process_node_nm": 3,
        "TDP": 15,
        "memory_support": "LPDDR5-6400",
        "price_MSRP": 1099,
        "status": "Released",
        "benchmarks": {
            "single_core": 2400,
            "multi_core": 11000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "16MB",
            "pcie": "4.0",
            "memory_channels": 2,
            "neural_engine": "16-core"
        },
        "sources": ["https://www.apple.com/newsroom/2024/05/apple-unveils-new-ipad-pro-with-m4-chip-and-ipad-air-with-m2-chip/"],
        "description": "Apple's latest mobile processor with advanced AI capabilities"
    },

    // ========== MOBILE Processors (15 products) ==========
    {
        "id": 201,
        "name": "Apple A4",
        "vendor": "Apple",
        "category": "Mobile Processor",
        "release_date": "2010-04-03",
        "architecture": "ARMv7",
        "cores": 1,
        "threads": 1,
        "clock": 0.8,
        "boost_clock": 0.8,
        "GPU": "PowerVR SGX535",
        "NPU": "N/A",
        "process_node_nm": 45,
        "TDP": 2,
        "memory_support": "LPDDR1",
        "price_MSRP": 199,
        "status": "Discontinued",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1
        },
        "sources": ["https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/"],
        "description": "Apple's first custom SoC used in iPhone 4 and iPad"
    },
    {
        "id": 202,
        "name": "Qualcomm Snapdragon 8 Gen 3",
        "vendor": "Qualcomm",
        "category": "Mobile Processor",
        "release_date": "2023-10-24",
        "architecture": "ARMv9",
        "cores": 8,
        "threads": 8,
        "clock": 3.3,
        "boost_clock": 3.3,
        "GPU": "Adreno 750",
        "NPU": "Hexagon",
        "process_node_nm": 4,
        "TDP": 10,
        "memory_support": "LPDDR5X-4800",
        "price_MSRP": 899,
        "status": "Released",
        "benchmarks": {
            "single_core": 1600,
            "multi_core": 6500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "8MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "X75 5G"
        },
        "sources": ["https://www.qualcomm.com/products/mobile/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform"],
        "description": "Qualcomm's flagship mobile processor with advanced AI capabilities"
    },
    {
        "id": 203,
        "name": "Apple A18 Pro",
        "vendor": "Apple",
        "category": "Mobile Processor",
        "release_date": "2024-09-10",
        "architecture": "ARMv9-A",
        "cores": 6,
        "threads": 6,
        "clock": 3.9,
        "boost_clock": 3.9,
        "GPU": "6-core",
        "NPU": "16-core",
        "process_node_nm": 3,
        "TDP": 12,
        "memory_support": "LPDDR5-6400",
        "price_MSRP": 699,
        "status": "Released",
        "benchmarks": {
            "single_core": 2300,
            "multi_core": 7200
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "12MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "neural_engine": "16-core"
        },
        "sources": ["https://www.apple.com/newsroom/2024/09/iphone-16-pro-and-iphone-16-pro-max/"],
        "description": "Apple's most powerful mobile processor for iPhone 16 Pro"
    },
    {
        "id": 204,
        "name": "Qualcomm Snapdragon 8 Gen 2",
        "vendor": "Qualcomm",
        "category": "Mobile Processor",
        "release_date": "2022-11-15",
        "architecture": "ARM",
        "cores": 8,
        "threads": 8,
        "clock": 3.2,
        "boost_clock": 3.36,
        "GPU": "Adreno 740",
        "NPU": "Hexagon",
        "process_node_nm": 4,
        "TDP": 5,
        "memory_support": "LPDDR5X-4200",
        "price_MSRP": 160,
        "status": "Released",
        "benchmarks": {
            "single_core": 1500,
            "multi_core": 5000
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "8MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "X70 5G"
        },
        "sources": ["https://www.qualcomm.com/products/mobile/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-2-mobile-platform"],
        "description": "Qualcomm's flagship mobile processor with advanced AI capabilities"
    },
    {
        "id": 205,
        "name": "MediaTek Dimensity 9300",
        "vendor": "MediaTek",
        "category": "Mobile Processor",
        "release_date": "2023-11-06",
        "architecture": "ARMv9",
        "cores": 8,
        "threads": 8,
        "clock": 3.25,
        "boost_clock": 3.25,
        "GPU": "Immortalis-G720",
        "NPU": "APU 790",
        "process_node_nm": 4,
        "TDP": 8,
        "memory_support": "LPDDR5T-9600",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 1550,
            "multi_core": 6800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "10MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://www.mediatek.com/products/smartphones/dimensity-9300"],
        "description": "MediaTek's flagship processor with all-big-core architecture"
    },
    {
        "id": 206,
        "name": "Samsung Exynos 2400",
        "vendor": "Samsung",
        "category": "Mobile Processor",
        "release_date": "2024-01-17",
        "architecture": "ARMv9",
        "cores": 10,
        "threads": 10,
        "clock": 3.21,
        "boost_clock": 3.21,
        "GPU": "Xclipse 940",
        "NPU": "Dual-core",
        "process_node_nm": 4,
        "TDP": 9,
        "memory_support": "LPDDR5X-4800",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 1450,
            "multi_core": 6200
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "9MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://semiconductor.samsung.com/consumer/exynos/2400/"],
        "description": "Samsung's flagship mobile processor with AMD RDNA graphics"
    },
    {
        "id": 207,
        "name": "Google Tensor G3",
        "vendor": "Google",
        "category": "Mobile Processor",
        "release_date": "2023-10-04",
        "architecture": "ARMv9",
        "cores": 9,
        "threads": 9,
        "clock": 3.0,
        "boost_clock": 3.0,
        "GPU": "Immortalis-G715s",
        "NPU": "Next-gen TPU",
        "process_node_nm": 4,
        "TDP": 7,
        "memory_support": "LPDDR5X-4200",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 1400,
            "multi_core": 4500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "8MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://store.google.com/product/pixel_8_pro_specs"],
        "description": "Google's custom processor focused on AI and machine learning"
    },
    {
        "id": 208,
        "name": "Qualcomm Snapdragon 7+ Gen 2",
        "vendor": "Qualcomm",
        "category": "Mobile Processor",
        "release_date": "2023-03-17",
        "architecture": "ARM",
        "cores": 8,
        "threads": 8,
        "clock": 2.91,
        "boost_clock": 2.91,
        "GPU": "Adreno 725",
        "NPU": "Hexagon",
        "process_node_nm": 4,
        "TDP": 4,
        "memory_support": "LPDDR5-3200",
        "price_MSRP": 120,
        "status": "Released",
        "benchmarks": {
            "single_core": 1200,
            "multi_core": 3700
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "6MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "X62 5G"
        },
        "sources": ["https://www.qualcomm.com/products/mobile/snapdragon-7-series-mobile-platforms/snapdragon-7-plus-gen-2-mobile-platform"],
        "description": "Qualcomm's premium mid-range mobile processor"
    },
    {
        "id": 209,
        "name": "MediaTek Dimensity 8300",
        "vendor": "MediaTek",
        "category": "Mobile Processor",
        "release_date": "2023-11-21",
        "architecture": "ARMv9",
        "cores": 8,
        "threads": 8,
        "clock": 3.35,
        "boost_clock": 3.35,
        "GPU": "Mali-G615",
        "NPU": "APU 780",
        "process_node_nm": 4,
        "TDP": 6,
        "memory_support": "LPDDR5X-4800",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 1350,
            "multi_core": 4800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "6MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://www.mediatek.com/products/smartphones/dimensity-8300"],
        "description": "MediaTek's upper mid-range processor with premium features"
    },
    {
        "id": 210,
        "name": "Apple A17 Pro",
        "vendor": "Apple",
        "category": "Mobile Processor",
        "release_date": "2023-09-12",
        "architecture": "Apple Silicon",
        "cores": 6,
        "threads": 6,
        "clock": 3.78,
        "boost_clock": 3.78,
        "GPU": "6-core",
        "NPU": "16-core",
        "process_node_nm": 3,
        "TDP": 8,
        "memory_support": "LPDDR5-6400",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 2100,
            "multi_core": 5500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "8MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "neural_engine": "16-core"
        },
        "sources": ["https://www.apple.com/newsroom/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/"],
        "description": "Apple's powerful mobile processor for iPhone 15 Pro"
    },
    {
        "id": 211,
        "name": "Qualcomm Snapdragon 6 Gen 1",
        "vendor": "Qualcomm",
        "category": "Mobile Processor",
        "release_date": "2022-09-06",
        "architecture": "ARMv9",
        "cores": 8,
        "threads": 8,
        "clock": 2.2,
        "boost_clock": 2.2,
        "GPU": "Adreno",
        "NPU": "Hexagon",
        "process_node_nm": 4,
        "TDP": 3,
        "memory_support": "LPDDR5-2750",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 900,
            "multi_core": 2500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "4MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://www.qualcomm.com/products/mobile/snapdragon-6-series-mobile-platforms/snapdragon-6-gen-1-mobile-platform"],
        "description": "Qualcomm's mid-range 5G processor for budget smartphones"
    },
    {
        "id": 212,
        "name": "MediaTek Dimensity 7050",
        "vendor": "MediaTek",
        "category": "Mobile Processor",
        "release_date": "2023-05-10",
        "architecture": "ARMv8",
        "cores": 8,
        "threads": 8,
        "clock": 2.6,
        "boost_clock": 2.6,
        "GPU": "Mali-G68",
        "NPU": "APU",
        "process_node_nm": 6,
        "TDP": 4,
        "memory_support": "LPDDR4X-2133",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 750,
            "multi_core": 2200
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "4MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://www.mediatek.com/products/smartphones/dimensity-7050"],
        "description": "MediaTek's budget 5G processor for entry-level smartphones"
    },
    {
        "id": 213,
        "name": "Samsung Exynos 1380",
        "vendor": "Samsung",
        "category": "Mobile Processor",
        "release_date": "2023-02-01",
        "architecture": "ARMv8",
        "cores": 8,
        "threads": 8,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "Mali-G68",
        "NPU": "Dual-core",
        "process_node_nm": 5,
        "TDP": 4,
        "memory_support": "LPDDR4X-2133",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 800,
            "multi_core": 2400
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "4MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://semiconductor.samsung.com/consumer/exynos/1380/"],
        "description": "Samsung's mid-range 5G processor for A-series smartphones"
    },
    {
        "id": 214,
        "name": "Qualcomm Snapdragon 4 Gen 2",
        "vendor": "Qualcomm",
        "category": "Mobile Processor",
        "release_date": "2023-06-26",
        "architecture": "ARMv8",
        "cores": 8,
        "threads": 8,
        "clock": 2.2,
        "boost_clock": 2.2,
        "GPU": "Adreno",
        "NPU": "Hexagon",
        "process_node_nm": 4,
        "TDP": 2,
        "memory_support": "LPDDR4X-2133",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 600,
            "multi_core": 1800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "2MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "5G"
        },
        "sources": ["https://www.qualcomm.com/products/mobile/snapdragon-4-series-mobile-platforms/snapdragon-4-gen-2-mobile-platform"],
        "description": "Qualcomm's entry-level 5G processor for budget devices"
    },
    {
        "id": 215,
        "name": "Unisoc T606",
        "vendor": "Unisoc",
        "category": "Mobile Processor",
        "release_date": "2021-03-15",
        "architecture": "ARMv8",
        "cores": 8,
        "threads": 8,
        "clock": 1.6,
        "boost_clock": 1.6,
        "GPU": "Mali-G57",
        "NPU": "N/A",
        "process_node_nm": 12,
        "TDP": 2,
        "memory_support": "LPDDR4X-1600",
        "price_MSRP": 0,
        "status": "Released",
        "benchmarks": {
            "single_core": 300,
            "multi_core": 1200
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Integrated",
            "cache": "1MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "modem": "4G"
        },
        "sources": ["https://www.unisoc.com/products/t606"],
        "description": "Entry-level processor for ultra-budget smartphones"
    },

    // ========== DEVELOPMENT BOARDS (15 products) ==========
    {
        "id": 301,
        "name": "Raspberry Pi 5",
        "vendor": "Raspberry Pi",
        "category": "Development Board",
        "release_date": "2023-10-23",
        "architecture": "ARM Cortex-A76",
        "cores": 4,
        "threads": 4,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "VideoCore VII",
        "NPU": "N/A",
        "process_node_nm": 16,
        "TDP": 12,
        "memory_support": "LPDDR4X-4267",
        "price_MSRP": 60,
        "status": "Released",
        "benchmarks": {
            "single_core": 450,
            "multi_core": 1200
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Broadcom BCM2712",
            "cache": "2MB",
            "pcie": "2.0",
            "memory_channels": 1,
            "gpio": "40-pin"
        },
        "sources": ["https://www.raspberrypi.com/products/raspberry-pi-5/"],
        "description": "The latest single-board computer from Raspberry Pi Foundation"
    },
    {
        "id": 302,
        "name": "Arduino Uno R4",
        "vendor": "Arduino",
        "category": "Development Board",
        "release_date": "2023-06-15",
        "architecture": "ARM Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 0.048,
        "boost_clock": 0.048,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 25,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "RA4M1",
            "cache": "32KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "14 digital, 6 analog"
        },
        "sources": ["https://store.arduino.cc/products/arduino-uno-r4-wifi"],
        "description": "Popular development board for electronics projects"
    },
    {
        "id": 303,
        "name": "NVIDIA Jetson Nano Developer Kit",
        "vendor": "NVIDIA",
        "category": "Development Board",
        "release_date": "2019-03-18",
        "architecture": "ARM Cortex-A57",
        "cores": 4,
        "threads": 4,
        "clock": 1.43,
        "boost_clock": 1.43,
        "GPU": "128-core Maxwell",
        "NPU": "N/A",
        "process_node_nm": 20,
        "TDP": 10,
        "memory_support": "LPDDR4-1600",
        "price_MSRP": 99,
        "status": "Released",
        "benchmarks": {
            "ai_performance": "472 GFLOPS"
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Tegra X1",
            "cache": "2MB",
            "pcie": "2.0",
            "memory_channels": 1,
            "gpio": "40-pin"
        },
        "sources": ["https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-nano/"],
        "description": "AI computing device for embedded applications"
    },
    {
        "id": 304,
        "name": "BeagleBone Black",
        "vendor": "BeagleBoard",
        "category": "Development Board",
        "release_date": "2013-04-23",
        "architecture": "ARM Cortex-A8",
        "cores": 1,
        "threads": 1,
        "clock": 1.0,
        "boost_clock": 1.0,
        "GPU": "PowerVR SGX530",
        "NPU": "N/A",
        "process_node_nm": 65,
        "TDP": 2,
        "memory_support": "DDR3-800",
        "price_MSRP": 45,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "AM3358",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "65 digital"
        },
        "sources": ["https://beagleboard.org/black"],
        "description": "Open-source development board with extensive I/O capabilities"
    },
    {
        "id": 305,
        "name": "Arduino Nano ESP32",
        "vendor": "Arduino",
        "category": "Development Board",
        "release_date": "2023-07-01",
        "architecture": "XTensa LX7",
        "cores": 2,
        "threads": 2,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 20,
        "status": "Released",
        "benchmarks": {
            "coremark": 800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ESP32-S3",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth",
            "gpio": "14 digital, 8 analog"
        },
        "sources": ["https://store.arduino.cc/products/arduino-nano-esp32"],
        "description": "Arduino Nano form factor with ESP32-S3 connectivity"
    },
    {
        "id": 306,
        "name": "Raspberry Pi Pico W",
        "vendor": "Raspberry Pi",
        "category": "Development Board",
        "release_date": "2022-06-30",
        "architecture": "ARM Cortex-M0+",
        "cores": 2,
        "threads": 2,
        "clock": 1.33,
        "boost_clock": 1.33,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 6,
        "status": "Released",
        "benchmarks": {
            "coremark": 450
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "RP2040",
            "cache": "264KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi",
            "gpio": "26 digital"
        },
        "sources": ["https://www.raspberrypi.com/products/raspberry-pi-pico-w/"],
        "description": "Wireless version of Raspberry Pi's microcontroller board"
    },
    {
        "id": 307,
        "name": "ESP32-DevKitC",
        "vendor": "Espressif",
        "category": "Development Board",
        "release_date": "2016-09-01",
        "architecture": "XTensa LX6",
        "cores": 2,
        "threads": 2,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 8,
        "status": "Released",
        "benchmarks": {
            "coremark": 800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ESP32-WROOM-32",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth",
            "gpio": "38 digital"
        },
        "sources": ["https://www.espressif.com/en/products/devkits/esp32-devkitc"],
        "description": "Official ESP32 development board from Espressif"
    },
    {
        "id": 308,
        "name": "Adafruit Feather M0",
        "vendor": "Adafruit",
        "category": "Development Board",
        "release_date": "2016-01-01",
        "architecture": "ARM Cortex-M0+",
        "cores": 1,
        "threads": 1,
        "clock": 0.048,
        "boost_clock": 0.048,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 20,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ATSAMD21G18",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "20 digital"
        },
        "sources": ["https://www.adafruit.com/product/2772"],
        "description": "Compact development board with battery management"
    },
    {
        "id": 309,
        "name": "Orange Pi 5",
        "vendor": "Orange Pi",
        "category": "Development Board",
        "release_date": "2022-12-01",
        "architecture": "ARM Cortex-A76/A55",
        "cores": 8,
        "threads": 8,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "Mali-G610",
        "NPU": "N/A",
        "process_node_nm": 8,
        "TDP": 12,
        "memory_support": "LPDDR4X-4266",
        "price_MSRP": 80,
        "status": "Released",
        "benchmarks": {
            "single_core": 400,
            "multi_core": 1500
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Rockchip RK3588S",
            "cache": "3MB",
            "pcie": "3.0",
            "memory_channels": 1,
            "gpio": "26-pin"
        },
        "sources": ["https://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5.html"],
        "description": "High-performance single-board computer alternative to Raspberry Pi"
    },
    {
        "id": 310,
        "name": "STM32 Nucleo-64",
        "vendor": "STMicroelectronics",
        "category": "Development Board",
        "release_date": "2014-01-01",
        "architecture": "ARM Cortex-M0/M3/M4",
        "cores": 1,
        "threads": 1,
        "clock": 0.084,
        "boost_clock": 0.216,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 11,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "STM32",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "Arduino compatible"
        },
        "sources": ["https://www.st.com/en/evaluation-tools/nucleo-f103rb.html"],
        "description": "Affordable development board for STM32 microcontrollers"
    },
    {
        "id": 311,
        "name": "BBC micro:bit v2",
        "vendor": "Micro:bit Foundation",
        "category": "Development Board",
        "release_date": "2020-10-13",
        "architecture": "ARM Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 0.064,
        "boost_clock": 0.064,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.1,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 15,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "nRF52833",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "Bluetooth",
            "gpio": "25-pin"
        },
        "sources": ["https://microbit.org/new-microbit/"],
        "description": "Educational development board for teaching coding and electronics"
    },
    {
        "id": 312,
        "name": "Arduino Mega 2560",
        "vendor": "Arduino",
        "category": "Development Board",
        "release_date": "2010-09-01",
        "architecture": "AVR",
        "cores": 1,
        "threads": 1,
        "clock": 0.016,
        "boost_clock": 0.016,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 350,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 45,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ATmega2560",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "54 digital, 16 analog"
        },
        "sources": ["https://store.arduino.cc/products/arduino-mega-2560-rev3"],
        "description": "Arduino board with extensive I/O capabilities"
    },
    {
        "id": 313,
        "name": "Raspberry Pi 4 Model B",
        "vendor": "Raspberry Pi",
        "category": "Development Board",
        "release_date": "2019-06-24",
        "architecture": "ARM Cortex-A72",
        "cores": 4,
        "threads": 4,
        "clock": 1.5,
        "boost_clock": 1.5,
        "GPU": "VideoCore VI",
        "NPU": "N/A",
        "process_node_nm": 28,
        "TDP": 7,
        "memory_support": "LPDDR4-3200",
        "price_MSRP": 35,
        "status": "Released",
        "benchmarks": {
            "single_core": 300,
            "multi_core": 900
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Broadcom BCM2711",
            "cache": "1MB",
            "pcie": "2.0",
            "memory_channels": 1,
            "gpio": "40-pin"
        },
        "sources": ["https://www.raspberrypi.com/products/raspberry-pi-4-model-b/"],
        "description": "Popular single-board computer with desktop-level performance"
    },
    {
        "id": 314,
        "name": "Seeed Studio XIAO ESP32C3",
        "vendor": "Seeed Studio",
        "category": "Development Board",
        "release_date": "2022-03-01",
        "architecture": "RISC-V",
        "cores": 1,
        "threads": 1,
        "clock": 1.6,
        "boost_clock": 1.6,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 5,
        "status": "Released",
        "benchmarks": {
            "coremark": 400
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ESP32-C3",
            "cache": "400KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth 5.0",
            "gpio": "11 digital"
        },
        "sources": ["https://www.seeedstudio.com/Seeed-XIAO-ESP32C3-p-5431.html"],
        "description": "Ultra-small development board with WiFi and Bluetooth"
    },
    {
        "id": 315,
        "name": "Particle Photon",
        "vendor": "Particle",
        "category": "Development Board",
        "release_date": "2015-05-01",
        "architecture": "ARM Cortex-M3",
        "cores": 1,
        "threads": 1,
        "clock": 1.2,
        "boost_clock": 1.2,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 19,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "STM32F205",
            "cache": "128KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi",
            "gpio": "18 digital"
        },
        "sources": ["https://www.particle.io/products/hardware/photon/"],
        "description": "WiFi development board with cloud connectivity"
    },

    // ========== MICROCONTROLLERS (15 products) ==========
    {
        "id": 401,
        "name": "Intel 8051",
        "vendor": "Intel",
        "category": "Microcontroller",
        "release_date": "1980-01-01",
        "architecture": "8051",
        "cores": 1,
        "threads": 1,
        "clock": 0.012,
        "boost_clock": 0.012,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 3000,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 5,
        "status": "Discontinued",
        "benchmarks": {
            "coremark": 2
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "DIP",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1
        },
        "sources": ["https://www.intel.com/ark/intel-8051"],
        "description": "Classic 8-bit microcontroller architecture"
    },
    {
        "id": 402,
        "name": "Microchip ATmega328P",
        "vendor": "Microchip",
        "category": "Microcontroller",
        "release_date": "2008-04-01",
        "architecture": "AVR",
        "cores": 1,
        "threads": 1,
        "clock": 0.016,
        "boost_clock": 0.016,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 350,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 2,
        "status": "Released",
        "benchmarks": {
            "coremark": 8
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "DIP, QFN",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "23 digital, 6 analog"
        },
        "sources": ["https://www.microchip.com/en-us/product/atmega328p"],
        "description": "Popular 8-bit microcontroller used in Arduino Uno"
    },
    {
        "id": 403,
        "name": "Espressif ESP32-S3",
        "vendor": "Espressif",
        "category": "Microcontroller",
        "release_date": "2021-09-01",
        "architecture": "XTensa LX7",
        "cores": 2,
        "threads": 2,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 3,
        "status": "Released",
        "benchmarks": {
            "coremark": 800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "QFN",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth 5.0"
        },
        "sources": ["https://www.espressif.com/en/products/socs/esp32-s3"],
        "description": "Versatile microcontroller with WiFi and Bluetooth connectivity"
    },
    {
        "id": 404,
        "name": "STMicro STM32F103",
        "vendor": "STMicroelectronics",
        "category": "Microcontroller",
        "release_date": "2007-06-01",
        "architecture": "Cortex-M3",
        "cores": 1,
        "threads": 1,
        "clock": 0.072,
        "boost_clock": 0.072,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.1,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 3,
        "status": "Released",
        "benchmarks": {
            "coremark": 120
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LQFP",
            "cache": "64KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "51 digital"
        },
        "sources": ["https://www.st.com/en/microcontrollers-microprocessors/stm32f103.html"],
        "description": "Popular ARM Cortex-M3 microcontroller"
    },
    {
        "id": 405,
        "name": "Nordic nRF52840",
        "vendor": "Nordic Semiconductor",
        "category": "Microcontroller",
        "release_date": "2018-09-01",
        "architecture": "Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 0.064,
        "boost_clock": 0.064,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.1,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 5,
        "status": "Released",
        "benchmarks": {
            "coremark": 220
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "QFN",
            "cache": "256KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "Bluetooth 5.0, Thread, Zigbee"
        },
        "sources": ["https://www.nordicsemi.com/Products/nRF52840"],
        "description": "Bluetooth 5.0 microcontroller for IoT applications"
    },
    {
        "id": 406,
        "name": "Raspberry Pi RP2040",
        "vendor": "Raspberry Pi",
        "category": "Microcontroller",
        "release_date": "2021-01-21",
        "architecture": "ARM Cortex-M0+",
        "cores": 2,
        "threads": 2,
        "clock": 1.33,
        "boost_clock": 1.33,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 1,
        "status": "Released",
        "benchmarks": {
            "coremark": 450
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "QFN",
            "cache": "264KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "30 digital"
        },
        "sources": ["https://www.raspberrypi.com/products/rp2040/"],
        "description": "Raspberry Pi's first in-house microcontroller"
    },
    {
        "id": 407,
        "name": "Microchip PIC16F877A",
        "vendor": "Microchip",
        "category": "Microcontroller",
        "release_date": "2003-01-01",
        "architecture": "PIC",
        "cores": 1,
        "threads": 1,
        "clock": 0.02,
        "boost_clock": 0.02,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 350,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 4,
        "status": "Released",
        "benchmarks": {
            "coremark": 5
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "DIP, QFN",
            "cache": "368B",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "33 digital, 8 analog"
        },
        "sources": ["https://www.microchip.com/en-us/product/PIC16F877A"],
        "description": "Classic 8-bit PIC microcontroller for educational use"
    },
    {
        "id": 408,
        "name": "Espressif ESP32-C6",
        "vendor": "Espressif",
        "category": "Microcontroller",
        "release_date": "2023-08-01",
        "architecture": "RISC-V",
        "cores": 1,
        "threads": 1,
        "clock": 1.6,
        "boost_clock": 1.6,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 2,
        "status": "Released",
        "benchmarks": {
            "coremark": 650
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "QFN",
            "cache": "320KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi 6, Bluetooth 5.0, Zigbee"
        },
        "sources": ["https://www.espressif.com/en/products/socs/esp32-c6"],
        "description": "ESP32 series microcontroller with WiFi 6 and multi-protocol support"
    },
    {
        "id": 409,
        "name": "STMicro STM32H743",
        "vendor": "STMicroelectronics",
        "category": "Microcontroller",
        "release_date": "2016-07-01",
        "architecture": "Cortex-M7",
        "cores": 2,
        "threads": 2,
        "clock": 0.48,
        "boost_clock": 0.48,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 1,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 10,
        "status": "Released",
        "benchmarks": {
            "coremark": 2020
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LQFP, BGA",
            "cache": "1MB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "168 digital"
        },
        "sources": ["https://www.st.com/en/microcontrollers-microprocessors/stm32h743.html"],
        "description": "High-performance Cortex-M7 microcontroller"
    },
    {
        "id": 410,
        "name": "Texas Instruments MSP430FR5994",
        "vendor": "Texas Instruments",
        "category": "Microcontroller",
        "release_date": "2017-03-01",
        "architecture": "MSP430",
        "cores": 1,
        "threads": 1,
        "clock": 0.016,
        "boost_clock": 0.016,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 130,
        "TDP": 0.1,
        "memory_support": "FRAM, SRAM",
        "price_MSRP": 5,
        "status": "Released",
        "benchmarks": {
            "coremark": 150
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LQFP",
            "cache": "8KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "83 digital"
        },
        "sources": ["https://www.ti.com/product/MSP430FR5994"],
        "description": "Ultra-low-power microcontroller with FRAM memory"
    },
    {
        "id": 411,
        "name": "NXP LPC1768",
        "vendor": "NXP",
        "category": "Microcontroller",
        "release_date": "2010-01-01",
        "architecture": "Cortex-M3",
        "cores": 1,
        "threads": 1,
        "clock": 0.1,
        "boost_clock": 0.1,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 6,
        "status": "Released",
        "benchmarks": {
            "coremark": 180
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LQFP",
            "cache": "64KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "70 digital"
        },
        "sources": ["https://www.nxp.com/products/processors-and-microcontrollers/arm-microcontrollers/general-purpose-mcus/lpc1700-cortex-m3/"],
        "description": "ARM Cortex-M3 microcontroller for industrial applications"
    },
    {
        "id": 412,
        "name": "Microchip SAMD21",
        "vendor": "Microchip",
        "category": "Microcontroller",
        "release_date": "2014-01-01",
        "architecture": "Cortex-M0+",
        "cores": 1,
        "threads": 1,
        "clock": 0.048,
        "boost_clock": 0.048,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 3,
        "status": "Released",
        "benchmarks": {
            "coremark": 90
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "QFN",
            "cache": "32KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "22 digital"
        },
        "sources": ["https://www.microchip.com/en-us/product/ATSAMD21G18"],
        "description": "ARM Cortex-M0+ microcontroller used in Arduino Zero"
    },
    {
        "id": 413,
        "name": "Espressif ESP8266EX",
        "vendor": "Espressif",
        "category": "Microcontroller",
        "release_date": "2014-01-01",
        "architecture": "Tensilica LX106",
        "cores": 1,
        "threads": 1,
        "clock": 0.08,
        "boost_clock": 0.16,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 2,
        "status": "Released",
        "benchmarks": {
            "coremark": 150
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "QFN",
            "cache": "128KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi"
        },
        "sources": ["https://www.espressif.com/en/products/socs/esp8266"],
        "description": "The microcontroller that popularized IoT with WiFi"
    },
    {
        "id": 414,
        "name": "Renesas RA6M4",
        "vendor": "Renesas",
        "category": "Microcontroller",
        "release_date": "2020-01-01",
        "architecture": "Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 0.2,
        "boost_clock": 0.2,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 8,
        "status": "Released",
        "benchmarks": {
            "coremark": 600
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LQFP",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "100 digital"
        },
        "sources": ["https://www.renesas.com/us/en/products/microcontrollers-microprocessors/ra-cortex-m-mcus/ra6m4-100-mhz-cortex-m4-microcontrollers-security-connectivity-and-hmi"],
        "description": "Secure Cortex-M4 microcontroller for IoT applications"
    },
    {
        "id": 415,
        "name": "Infineon XMC4700",
        "vendor": "Infineon",
        "category": "Microcontroller",
        "release_date": "2015-01-01",
        "architecture": "Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 0.144,
        "boost_clock": 0.144,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 65,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 12,
        "status": "Released",
        "benchmarks": {
            "coremark": 450
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "LQFP, BGA",
            "cache": "256KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "gpio": "140 digital"
        },
        "sources": ["https://www.infineon.com/cms/en/product/microcontroller/32-bit-industrial-microcontroller-based-on-arm-cortex-m/"],
        "description": "Industrial-grade microcontroller for motor control applications"
    },

    // ========== IoT DEVICES (15 products) ==========
    {
        "id": 501,
        "name": "ESP-01 (ESP8266 module)",
        "vendor": "Espressif",
        "category": "IoT Device",
        "release_date": "2014-01-01",
        "architecture": "Wi‑Fi (2.4 GHz)",
        "cores": 1,
        "threads": 1,
        "clock": 0.08,
        "boost_clock": 0.16,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 2,
        "status": "Released",
        "benchmarks": {
            "coremark": 150
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Module",
            "cache": "128KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi"
        },
        "sources": ["https://www.espressif.com/en/products/modules/esp-01"],
        "description": "Compact WiFi module based on ESP8266"
    },
    {
        "id": 502,
        "name": "Google Coral Dev Board",
        "vendor": "Google",
        "category": "IoT Device",
        "release_date": "2019-03-01",
        "architecture": "ARM",
        "cores": 4,
        "threads": 4,
        "clock": 1.5,
        "boost_clock": 1.5,
        "GPU": "GC7000 Lite",
        "NPU": "Edge TPU",
        "process_node_nm": 28,
        "TDP": 5,
        "memory_support": "LPDDR4-3200",
        "price_MSRP": 130,
        "status": "Released",
        "benchmarks": {
            "ai_performance": "4 TOPS"
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "SOM",
            "cache": "1MB",
            "pcie": "2.0",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth"
        },
        "sources": ["https://coral.ai/products/dev-board"],
        "description": "Development board with Edge TPU for AI and ML applications"
    },
    {
        "id": 503,
        "name": "NVIDIA Jetson Nano",
        "vendor": "NVIDIA",
        "category": "IoT Device",
        "release_date": "2019-03-01",
        "architecture": "ARM",
        "cores": 4,
        "threads": 4,
        "clock": 1.43,
        "boost_clock": 1.43,
        "GPU": "128-core Maxwell",
        "NPU": "N/A",
        "process_node_nm": 20,
        "TDP": 10,
        "memory_support": "LPDDR4-1600",
        "price_MSRP": 99,
        "status": "Released",
        "benchmarks": {
            "ai_performance": "472 GFLOPS"
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "SOM",
            "cache": "2MB",
            "pcie": "2.0",
            "memory_channels": 1,
            "gpio": "40-pin"
        },
        "sources": ["https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-nano/"],
        "description": "AI computing device for embedded applications"
    },
    {
        "id": 504,
        "name": "ESP32-WROOM-32",
        "vendor": "Espressif",
        "category": "IoT Device",
        "release_date": "2016-09-01",
        "architecture": "Wi‑Fi + BT",
        "cores": 2,
        "threads": 2,
        "clock": 0.24,
        "boost_clock": 2.4,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 1,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 6,
        "status": "Released",
        "benchmarks": {
            "coremark": 800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Module",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth"
        },
        "sources": ["https://www.espressif.com/en/products/modules/esp32-wroom-32"],
        "description": "Popular WiFi+Bluetooth module for IoT applications"
    },
    {
        "id": 505,
        "name": "nRF52840 module",
        "vendor": "Nordic Semiconductor",
        "category": "IoT Device",
        "release_date": "2018-09-01",
        "architecture": "BLE/Thread/Zigbee",
        "cores": 1,
        "threads": 1,
        "clock": 0.064,
        "boost_clock": 0.064,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.1,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 5,
        "status": "Released",
        "benchmarks": {
            "coremark": 220
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Module",
            "cache": "256KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "Bluetooth 5.0, Thread, Zigbee"
        },
        "sources": ["https://www.nordicsemi.com/Products/nRF52840"],
        "description": "Multi-protocol wireless module for IoT applications"
    },
    {
        "id": 506,
        "name": "Semtech SX1276",
        "vendor": "Semtech",
        "category": "IoT Device",
        "release_date": "2013-01-01",
        "architecture": "LoRa (Sub‑GHz)",
        "cores": 1,
        "threads": 1,
        "clock": 0.016,
        "boost_clock": 0.016,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 130,
        "TDP": 0.05,
        "memory_support": "SRAM",
        "price_MSRP": 3,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Module",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "LoRa"
        },
        "sources": ["https://www.semtech.com/products/wireless-rf/lora-core/sx1276"],
        "description": "LoRa transceiver for long-range, low-power IoT applications"
    },
    {
        "id": 507,
        "name": "Quectel EC25",
        "vendor": "Quectel",
        "category": "IoT Device",
        "release_date": "2015-01-01",
        "architecture": "LTE Cat 4",
        "cores": 1,
        "threads": 1,
        "clock": 0.8,
        "boost_clock": 0.8,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 49,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Module",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "LTE Cat 4"
        },
        "sources": ["https://www.quectel.com/product/ec25"],
        "description": "LTE cellular module for IoT connectivity"
    },
    {
        "id": 508,
        "name": "u-blox SARA-R410M",
        "vendor": "u-blox",
        "category": "IoT Device",
        "release_date": "2017-01-01",
        "architecture": "LTE-M/NB-IoT",
        "cores": 1,
        "threads": 1,
        "clock": 0.8,
        "boost_clock": 0.8,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 39,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Module",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "LTE-M, NB-IoT"
        },
        "sources": ["https://www.u-blox.com/en/product/sara-r4-series"],
        "description": "LPWAN cellular module for IoT applications"
    },
    {
        "id": 509,
        "name": "Raspberry Pi Zero 2 W",
        "vendor": "Raspberry Pi",
        "category": "IoT Device",
        "release_date": "2021-10-28",
        "architecture": "ARM Cortex-A53",
        "cores": 4,
        "threads": 4,
        "clock": 1.0,
        "boost_clock": 1.0,
        "GPU": "VideoCore IV",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 2,
        "memory_support": "LPDDR2-1000",
        "price_MSRP": 15,
        "status": "Released",
        "benchmarks": {
            "single_core": 150,
            "multi_core": 400
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "Broadcom BCM2710A1",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth",
            "gpio": "40-pin"
        },
        "sources": ["https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/"],
        "description": "Ultra-compact single-board computer with wireless connectivity"
    },
    {
        "id": 510,
        "name": "Arduino MKR WiFi 1010",
        "vendor": "Arduino",
        "category": "IoT Device",
        "release_date": "2018-09-01",
        "architecture": "ARM Cortex-M0+",
        "cores": 1,
        "threads": 1,
        "clock": 0.048,
        "boost_clock": 0.048,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.2,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 33,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "SAMD21",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth",
            "gpio": "22 digital"
        },
        "sources": ["https://store.arduino.cc/products/arduino-mkr-wifi-1010"],
        "description": "Compact IoT board with crypto-chip for secure connections"
    },
    {
        "id": 511,
        "name": "Particle Boron",
        "vendor": "Particle",
        "category": "IoT Device",
        "release_date": "2018-06-01",
        "architecture": "ARM Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 1.2,
        "boost_clock": 1.2,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 49,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "nRF52840",
            "cache": "256KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "LTE, BLE"
        },
        "sources": ["https://www.particle.io/products/hardware/boron-lte/"],
        "description": "Cellular IoT development kit with cloud connectivity"
    },
    {
        "id": 512,
        "name": "Adafruit Huzzah32 - ESP32 Feather",
        "vendor": "Adafruit",
        "category": "IoT Device",
        "release_date": "2017-01-01",
        "architecture": "XTensa LX6",
        "cores": 2,
        "threads": 2,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 20,
        "status": "Released",
        "benchmarks": {
            "coremark": 800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ESP32",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth",
            "gpio": "20 digital"
        },
        "sources": ["https://www.adafruit.com/product/3405"],
        "description": "ESP32 development board in Feather form factor"
    },
    {
        "id": 513,
        "name": "Seeed Studio Wio Terminal",
        "vendor": "Seeed Studio",
        "category": "IoT Device",
        "release_date": "2020-05-01",
        "architecture": "ARM Cortex-M4",
        "cores": 1,
        "threads": 1,
        "clock": 1.2,
        "boost_clock": 1.2,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 90,
        "TDP": 0.3,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 36,
        "status": "Released",
        "benchmarks": {},
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ATSAMD51",
            "cache": "192KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth",
            "gpio": "40-pin",
            "display": "2.4\" LCD"
        },
        "sources": ["https://www.seeedstudio.com/Wio-Terminal-p-4509.html"],
        "description": "IoT development device with built-in display and sensors"
    },
    {
        "id": 514,
        "name": "Heltec WiFi LoRa 32 (V2)",
        "vendor": "Heltec",
        "category": "IoT Device",
        "release_date": "2018-01-01",
        "architecture": "XTensa LX6",
        "cores": 2,
        "threads": 2,
        "clock": 2.4,
        "boost_clock": 2.4,
        "GPU": "N/A",
        "NPU": "N/A",
        "process_node_nm": 40,
        "TDP": 0.5,
        "memory_support": "SRAM, Flash",
        "price_MSRP": 15,
        "status": "Released",
        "benchmarks": {
            "coremark": 800
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "ESP32",
            "cache": "512KB",
            "pcie": "N/A",
            "memory_channels": 1,
            "wireless": "WiFi, Bluetooth, LoRa",
            "gpio": "19 digital",
            "display": "OLED"
        },
        "sources": ["https://heltec.org/project/wifi-lora-32/"],
        "description": "ESP32 board with LoRa connectivity and OLED display"
    },
    {
        "id": 515,
        "name": "Google Coral USB Accelerator",
        "vendor": "Google",
        "category": "IoT Device",
        "release_date": "2019-05-07",
        "architecture": "Edge TPU",
        "cores": 1,
        "threads": 1,
        "clock": 1.0,
        "boost_clock": 1.0,
        "GPU": "N/A",
        "NPU": "Edge TPU",
        "process_node_nm": 28,
        "TDP": 2,
        "memory_support": "SRAM",
        "price_MSRP": 75,
        "status": "Released",
        "benchmarks": {
            "ai_performance": "4 TOPS"
        },
        "images": ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"],
        "specs": {
            "socket": "USB",
            "cache": "N/A",
            "pcie": "N/A",
            "memory_channels": 1,
            "interface": "USB 3.0"
        },
        "sources": ["https://coral.ai/products/usb-accelerator"],
        "description": "USB accessory that adds Edge TPU acceleration to any Linux system"
    }
];

// API Service (same implementation as before)
class ApiService {
    constructor() {
        this.products = [];
        this.isOnline = true;
        this.dataLoaded = false;
        this.cache = new Map();
        this.init();
    }

    async init() {
        await this.loadFromAPI();
    }

    async loadFromAPI() {
        try {
            const response = await this.simulateAPICall();
            
            if (response && response.products) {
                this.products = response.products;
                this.saveToLocalStorage();
                this.isOnline = true;
                this.dataLoaded = true;
                this.clearCache();
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.warn('API unavailable, loading from local storage:', error);
            await this.loadFromLocalStorage();
        }
    }

    async simulateAPICall() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { products: fallbackProducts };
    }

    async loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                this.products = data.products || fallbackProducts;
                this.isOnline = false;
                this.dataLoaded = true;
            } else {
                this.products = fallbackProducts;
                this.isOnline = false;
                this.dataLoaded = true;
            }
        } catch (error) {
            console.error('Error loading from local storage:', error);
            this.products = fallbackProducts;
            this.isOnline = false;
            this.dataLoaded = true;
        }
    }

    saveToLocalStorage() {
        try {
            const data = {
                products: this.products,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to local storage:', error);
        }
    }

    getCacheKey(filters, page, limit) {
        return JSON.stringify({ filters, page, limit });
    }

    clearCache() {
        this.cache.clear();
    }

    async getProducts(filters = {}, page = 1, limit = 12) {
        await this.ensureDataLoaded();
        
        const cacheKey = this.getCacheKey(filters, page, limit);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        let filteredProducts = [...this.products];
        
        // Apply filters
        if (filters.category) {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        
        if (filters.vendor) {
            filteredProducts = filteredProducts.filter(p => p.vendor === filters.vendor);
        }
        
        if (filters.architecture) {
            filteredProducts = filteredProducts.filter(p => p.architecture === filters.architecture);
        }
        
        if (filters.status) {
            filteredProducts = filteredProducts.filter(p => p.status === filters.status);
        }
        
        if (filters.minCores) {
            filteredProducts = filteredProducts.filter(p => p.cores >= parseInt(filters.minCores));
        }
        
        if (filters.minClock) {
            filteredProducts = filteredProducts.filter(p => p.clock >= parseFloat(filters.minClock));
        }
        
        if (filters.maxTDP) {
            filteredProducts = filteredProducts.filter(p => p.TDP <= parseFloat(filters.maxTDP));
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.vendor.toLowerCase().includes(searchTerm) ||
                p.architecture.toLowerCase().includes(searchTerm) ||
                (p.description && p.description.toLowerCase().includes(searchTerm))
            );
        }
        
        // Sort by relevance or other criteria
        if (filters.sortBy) {
            filteredProducts = this.sortProducts(filteredProducts, filters.sortBy, filters.sortOrder);
        } else {
            // Default sort by ID (newest first)
            filteredProducts.sort((a, b) => b.id - a.id);
        }
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        const result = {
            products: paginatedProducts,
            total: filteredProducts.length,
            page,
            totalPages: Math.ceil(filteredProducts.length / limit),
            hasMore: endIndex < filteredProducts.length
        };
        
        // Cache the result
        this.cache.set(cacheKey, result);
        return result;
    }

    sortProducts(products, sortBy, sortOrder = 'desc') {
        const sorted = [...products];
        
        switch (sortBy) {
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'vendor':
                sorted.sort((a, b) => a.vendor.localeCompare(b.vendor));
                break;
            case 'cores':
                sorted.sort((a, b) => a.cores - b.cores);
                break;
            case 'clock':
                sorted.sort((a, b) => a.clock - b.clock);
                break;
            case 'tdp':
                sorted.sort((a, b) => a.TDP - b.TDP);
                break;
            case 'price':
                sorted.sort((a, b) => (a.price_MSRP || 0) - (b.price_MSRP || 0));
                break;
            case 'release_date':
                sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
            default:
                sorted.sort((a, b) => a.id - b.id);
        }
        
        if (sortOrder === 'desc') {
            sorted.reverse();
        }
        
        return sorted;
    }

    async getProduct(id) {
        await this.ensureDataLoaded();
        return this.products.find(p => p.id === parseInt(id));
    }

    async getRelatedProducts(product, limit = 4) {
        await this.ensureDataLoaded();
        
        return this.products
            .filter(p => p.id !== product.id && 
                        (p.category === product.category || p.vendor === product.vendor))
            .slice(0, limit);
    }

    async addProduct(productData) {
        await this.ensureDataLoaded();
        
        const newProduct = {
            id: this.generateId(),
            ...productData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        this.products.unshift(newProduct);
        this.saveToLocalStorage();
        this.clearCache();
        
        return newProduct;
    }

    async updateProduct(id, productData) {
        await this.ensureDataLoaded();
        
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            throw new Error('Product not found');
        }
        
        this.products[index] = {
            ...this.products[index],
            ...productData,
            updated_at: new Date().toISOString()
        };
        
        this.saveToLocalStorage();
        this.clearCache();
        return this.products[index];
    }

    async deleteProduct(id) {
        await this.ensureDataLoaded();
        
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            throw new Error('Product not found');
        }
        
        this.products.splice(index, 1);
        this.saveToLocalStorage();
        this.clearCache();
        return true;
    }

    generateId() {
        const maxId = this.products.reduce((max, p) => Math.max(max, p.id), 0);
        return maxId + 1;
    }

    async ensureDataLoaded() {
        if (!this.dataLoaded) {
            await this.loadFromLocalStorage();
        }
    }

    getCategories() {
        return [...new Set(this.products.map(p => p.category))].sort();
    }

    getVendors() {
        return [...new Set(this.products.map(p => p.vendor))].sort();
    }

    getArchitectures() {
        return [...new Set(this.products.map(p => p.architecture))].sort();
    }

    getStatuses() {
        return [...new Set(this.products.map(p => p.status))].sort();
    }

    getStats() {
        const stats = {
            total: this.products.length,
            byCategory: {},
            byVendor: {},
            byStatus: {},
            recentAdditions: this.products.slice(0, 10),
            averageCores: 0,
            averageClock: 0,
            averageTDP: 0
        };

        this.products.forEach(product => {
            stats.byCategory[product.category] = (stats.byCategory[product.category] || 0) + 1;
            stats.byVendor[product.vendor] = (stats.byVendor[product.vendor] || 0) + 1;
            stats.byStatus[product.status] = (stats.byStatus[product.status] || 0) + 1;
        });

        const validProducts = this.products.filter(p => p.cores && p.clock && p.TDP);
        if (validProducts.length > 0) {
            stats.averageCores = validProducts.reduce((sum, p) => sum + p.cores, 0) / validProducts.length;
            stats.averageClock = validProducts.reduce((sum, p) => sum + p.clock, 0) / validProducts.length;
            stats.averageTDP = validProducts.reduce((sum, p) => sum + p.TDP, 0) / validProducts.length;
        }

        return stats;
    }

    async advancedSearch(criteria = {}) {
        await this.ensureDataLoaded();
        
        let results = [...this.products];
        
        if (criteria.categories && criteria.categories.length > 0) {
            results = results.filter(p => criteria.categories.includes(p.category));
        }
        
        if (criteria.vendors && criteria.vendors.length > 0) {
            results = results.filter(p => criteria.vendors.includes(p.vendor));
        }
        
        if (criteria.minCores) {
            results = results.filter(p => p.cores >= criteria.minCores);
        }
        
        if (criteria.maxCores) {
            results = results.filter(p => p.cores <= criteria.maxCores);
        }
        
        if (criteria.minClock) {
            results = results.filter(p => p.clock >= criteria.minClock);
        }
        
        if (criteria.maxClock) {
            results = results.filter(p => p.clock <= criteria.maxClock);
        }
        
        if (criteria.minTDP) {
            results = results.filter(p => p.TDP >= criteria.minTDP);
        }
        
        if (criteria.maxTDP) {
            results = results.filter(p => p.TDP <= criteria.maxTDP);
        }
        
        if (criteria.minPrice) {
            results = results.filter(p => p.price_MSRP && p.price_MSRP >= criteria.minPrice);
        }
        
        if (criteria.maxPrice) {
            results = results.filter(p => p.price_MSRP && p.price_MSRP <= criteria.maxPrice);
        }
        
        if (criteria.architectures && criteria.architectures.length > 0) {
            results = results.filter(p => criteria.architectures.includes(p.architecture));
        }
        
        if (criteria.statuses && criteria.statuses.length > 0) {
            results = results.filter(p => criteria.statuses.includes(p.status));
        }
        
        if (criteria.searchTerm) {
            const searchTerm = criteria.searchTerm.toLowerCase();
            results = results.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.vendor.toLowerCase().includes(searchTerm) ||
                p.architecture.toLowerCase().includes(searchTerm) ||
                (p.description && p.description.toLowerCase().includes(searchTerm))
            );
        }
        
        return results;
    }
}

// Create global API instance
const apiService = new ApiService();