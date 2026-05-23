# Header Design - Complete Navigation System

## Overview
The header has been completely redesigned with a professional government portal layout featuring:
- Golden branding bar
- Bilingual organization information
- Advanced navigation menu
- Interactive icon buttons for user actions

## Header Components

### 1. Golden Top Bar
- **Color**: Golden gradient (#c9a961 to #d4a574)
- **Height**: 8px
- **Purpose**: Official branding bar at the top

### 2. Header Main Section
Three-section layout for optimal content distribution:

#### Left Section
- **ICA Logo**: `icalogo.png` - Organization logo (50px height)
- **Organization Info (Bilingual)**:
  - **Arabic**: الهيئة الاتحادية للهوية والجنسية والجمارك وأمن الحدود
    - Font Size: 14px
    - Right-to-left alignment
    - Bold weight
  - **English**: FEDERAL AUTHORITY FOR IDENTITY, CITIZENSHIP, CUSTOMS & PORT SECURITY
    - Font Size: 13px
    - Professional letter-spacing
    - Medium gray (#666)

#### Center Section
- Reserved for expansion
- Flexible design

#### Right Section
- **UAE National Emblem**: `uaelogo.svg` (50px height)
- **Icon Buttons** (5 interactive icons):
  1. **User Profile Icon** - Account/Login management
  2. **Language/Globe Icon** - Language switcher (AR/EN)
  3. **Search Icon** - Quick service search
  4. **Quick Links/Grid Icon** - Most visited pages
  5. **Menu/Hamburger Icon** - Navigation toggle (mobile)

## Icon Button Features

### Style Specifications
- Size: 24x24px SVG icons
- Color: #666 (gray) on hover: #c9a961 (gold)
- Background: Transparent
- Border: None
- Cursor: Pointer
- Gap between icons: 20px
- Responsive: Stack vertically on mobile

### Functionality
- **Profile Icon**: Opens user profile/login modal
- **Language Icon**: Opens language selector (Arabic/English + 6 other languages)
- **Search Icon**: Activates quick search for services
- **Quick Links Icon**: Shows most visited pages and quick access links
- **Menu Icon**: Toggles navigation menu on mobile devices

## Navigation Menu

### Menu Items
1. **Home** - Return to main page
2. **General Services** - Browse general government services
3. **Golden Visa Services** - Premium golden residency program
4. **Blue Residency Services** - Blue residency program
5. **Visa Services** - General visa and immigration services
6. **Help** (Dropdown):
   - FAQ
   - Instructions
   - Smart Services
7. **User Manual** - Complete user guide

### Styling
- Background: Light gray (#f8f8f8)
- Active State: Gold bottom border (#c9a961)
- Hover: Background white, gold border
- Dropdown: White background with subtle shadow
- Responsive: Vertical stack on mobile with expandable dropdowns

## Responsive Design

### Desktop (> 768px)
- Full header layout with all sections visible
- Navigation menu always visible below header
- All icons displayed in a row
- Menu toggle hidden

### Mobile (≤ 768px)
- Compact header layout
- Organization info hidden
- Hamburger menu icon visible
- Navigation menu toggles on/off
- Icons stack appropriately
- UAElogo hidden

## JavaScript Interactivity

### Menu Toggle
- Click hamburger icon to show/hide navigation menu
- Auto-hides on desktop, shows on mobile

### Language Switcher
- Opens language selection dialog
- Supports: Arabic, English, Spanish, German, Portuguese, French, Russian, Chinese, Urdu

### Search
- Click search icon to open search prompt
- Searches through services and content

### Quick Links
- Displays most frequently used pages:
  - New ID Card
  - Renew ID
  - Replace ID
  - Status Check

### Responsive Handler
- Automatically adjusts layout on window resize
- Shows/hides menu toggle button based on screen size

## Colors & Styling

### Header Colors
- Top Bar Gradient: #c9a961 → #d4a574
- Background: #fff
- Border: #eee
- Text (Arabic): #333
- Text (English): #666
- Icon Hover: #c9a961
- Navigation BG: #f8f8f8
- Dropdown BG: #fff

### Typography
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Arabic Support: RTL direction
- Letter Spacing: 0.5px (English)
- Font Weight: Bold (Arabic text), Normal/500 (English)

## Assets Used
- `icalogo.png` - ICA organization logo
- `uaelogo.svg` - UAE national emblem

## Accessibility Features
- Semantic HTML for navigation
- SVG icons with proper attributes
- Button titles for tooltips
- Keyboard navigation support
- Responsive touch-friendly targets (44px minimum)
