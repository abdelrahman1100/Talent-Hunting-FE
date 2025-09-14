# Blog Post System - Built with Ecme React Template

## Overview

This is a comprehensive blog post system built using the Ecme React Tailwind Admin Template. The system demonstrates how to leverage the template's ready-made UI components to create a full-featured blog management platform.

## System Architecture

The blog system consists of four main components:

1. **BlogDashboard** - Main dashboard with overview, posts list, and creation
2. **BlogList** - Grid view of all blog posts with search and filtering
3. **BlogCreate** - Form for creating and editing blog posts
4. **BlogDetail** - Individual blog post view with comments and interactions

## How Each Ecme Component is Used

### 1. Card Component (`src/components/ui/Card/Card.tsx`)

**Usage Examples:**
- **Blog Dashboard Stats Cards**: Used to display statistics in a clean, organized layout
- **Blog Post Cards**: Each blog post is wrapped in a card with hover effects
- **Form Sections**: Different form sections are separated using cards
- **Content Containers**: Blog content and comments are contained within cards

**Key Features Used:**
- `clickable` prop for interactive post cards
- `header` prop for section titles
- `bodyClass` for custom styling
- `bordered` prop for visual separation

**Code Example:**
```tsx
<Card 
    className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    clickable
    onClick={() => handleViewPost(post.id)}
>
    <Card.Header content="Post Title" />
    <Card.Body>
        {/* Content */}
    </Card.Body>
</Card>
```

### 2. Form Components (`src/components/ui/Form/`)

**Usage Examples:**
- **Blog Creation Form**: Complete form with validation and error handling
- **Comment System**: Form for adding comments to blog posts
- **Search and Filtering**: Search inputs throughout the system

**Key Features Used:**
- `Form` wrapper with `layout="vertical"` for clean form structure
- `FormItem` for proper label and error handling
- `Input` with various types (text, textarea, number)
- `Select` for dropdown selections
- `Checkbox` for boolean options
- `DatePicker` for date selection

**Code Example:**
```tsx
<Form onSubmit={handleSubmit} layout="vertical">
    <FormItem
        label="Post Title"
        invalid={!!errors.title}
        errorMessage={errors.title}
    >
        <Input
            placeholder="Enter your blog post title..."
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            size="lg"
        />
    </FormItem>
</Form>
```

### 3. Button Component (`src/components/ui/Button/Button.tsx`)

**Usage Examples:**
- **Action Buttons**: Create, edit, delete, like, share, bookmark
- **Form Submissions**: Submit and cancel buttons
- **Interactive Elements**: Like, comment, and navigation buttons

**Key Features Used:**
- `variant` prop for different button styles (solid, plain)
- `size` prop for consistent sizing (sm, md, lg)
- `icon` prop for icon integration
- `loading` state for async operations
- `disabled` state for form validation

**Code Example:**
```tsx
<Button
    variant="solid"
    size="lg"
    icon={<HiOutlinePlus />}
    onClick={handleCreatePost}
>
    Create New Post
</Button>
```

### 4. Avatar Component (`src/components/ui/Avatar/Avatar.tsx`)

**Usage Examples:**
- **Author Information**: Display author avatars in blog posts
- **Comment System**: User avatars in comments
- **User Profile**: Current user avatar in forms

**Key Features Used:**
- `size` prop for different avatar sizes (sm, md, lg)
- `src` prop for image sources
- `alt` prop for accessibility

**Code Example:**
```tsx
<Avatar 
    src={post.author.avatar} 
    alt={post.author.name}
    size="sm"
/>
```

### 5. Badge Component (`src/components/ui/Badge/Badge.tsx`)

**Usage Examples:**
- **Post Status**: Published, draft, archived indicators
- **Featured Posts**: Special badges for featured content
- **Tag Counts**: Number indicators on popular tags

**Key Features Used:**
- `variant` prop for different badge styles (success, warning, primary)
- `size` prop for consistent sizing

**Code Example:**
```tsx
<Badge 
    variant={post.status === 'published' ? 'success' : 'warning'}
    className="text-sm"
>
    {post.status}
</Badge>
```

### 6. Tag Component (`src/components/ui/Tag/Tag.tsx`)

**Usage Examples:**
- **Blog Post Tags**: Categorize posts with tags
- **Popular Tags**: Display trending tags with counts
- **Interactive Tags**: Removable tags in forms

**Key Features Used:**
- `size` prop for different tag sizes
- `closable` prop for removable tags
- `onClose` callback for tag removal

**Code Example:**
```tsx
<Tag
    key={tag}
    closable
    onClose={() => handleRemoveTag(tag)}
    className="text-sm"
>
    {tag}
</Tag>
```

### 7. Input Component (`src/components/ui/Input/Input.tsx`)

**Usage Examples:**
- **Search Functionality**: Search through blog posts
- **Form Fields**: Title, excerpt, content inputs
- **Tag Input**: Adding new tags to posts

**Key Features Used:**
- `prefix` prop for search icons
- `size` prop for consistent sizing
- `placeholder` for user guidance
- `onChange` for real-time updates

**Code Example:**
```tsx
<Input
    placeholder="Search blog posts..."
    prefix={<HiOutlineSearch className="text-gray-400" />}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    size="lg"
/>
```

### 8. Select Component (`src/components/ui/Select/Select.tsx`)

**Usage Examples:**
- **Category Selection**: Choose blog post categories
- **Status Selection**: Draft or published status
- **Sorting Options**: Sort posts by date, title, or views

**Key Features Used:**
- `value` prop for controlled selection
- `onChange` callback for selection updates
- `placeholder` for user guidance

**Code Example:**
```tsx
<Select
    value={formData.category}
    onChange={(value) => handleInputChange('category', value)}
>
    {categories.map(category => (
        <Select.Option key={category} value={category}>
            {category}
        </Select.Option>
    ))}
</Select>
```

### 9. Upload Component (`src/components/ui/Upload/Upload.tsx`)

**Usage Examples:**
- **Featured Images**: Upload blog post cover images
- **Image Management**: Replace or remove uploaded images

**Key Features Used:**
- `accept` prop for file type restrictions
- `onChange` callback for file handling
- Custom upload area styling

**Code Example:**
```tsx
<Upload
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full"
>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <HiOutlinePlus className="mx-auto h-12 w-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">Click to upload image</p>
    </div>
</Upload>
```

### 10. Pagination Component (`src/components/ui/Pagination/Pagination.tsx`)

**Usage Examples:**
- **Blog Post Lists**: Navigate through multiple pages of posts
- **Comment Pagination**: Handle large numbers of comments

**Key Features Used:**
- `total` prop for total item count
- `pageSize` prop for items per page
- `current` prop for current page
- `onChange` callback for page navigation

**Code Example:**
```tsx
<Pagination
    total={filteredPosts.length}
    pageSize={postsPerPage}
    current={currentPage}
    onChange={setCurrentPage}
    showSizeChanger={false}
    showQuickJumper
/>
```

### 11. Progress Component (`src/components/ui/Progress/Progress.tsx`)

**Usage Examples:**
- **Reading Progress**: Top progress bar showing reading completion
- **Publication Status**: Visual representation of published vs draft posts

**Key Features Used:**
- `percent` prop for progress percentage
- `showInfo` prop to hide percentage text
- `strokeColor` prop for custom colors

**Code Example:**
```tsx
<Progress 
    percent={readingProgress} 
    showInfo={false}
    strokeColor="#3b82f6"
    className="h-1"
/>
```

### 12. Tabs Component (`src/components/ui/Tabs/Tabs.tsx`)

**Usage Examples:**
- **Dashboard Navigation**: Switch between overview, posts, and creation views
- **Content Organization**: Organize different sections of the dashboard

**Key Features Used:**
- `value` prop for active tab
- `onChange` callback for tab switching
- `TabList` and `TabContent` for structure

**Code Example:**
```tsx
<Tabs value={activeTab} onChange={setActiveTab}>
    <Tabs.TabList>
        <Tabs.TabNav value="overview">Overview</Tabs.TabNav>
        <Tabs.TabNav value="posts">All Posts</Tabs.TabNav>
        <Tabs.TabNav value="create">Create Post</Tabs.TabNav>
    </Tabs.TabList>
    
    <Tabs.TabContent value="overview">
        {/* Overview content */}
    </Tabs.TabContent>
</Tabs>
```

### 13. Skeleton Component (`src/components/ui/Skeleton/Skeleton.tsx`)

**Usage Examples:**
- **Loading States**: Show skeleton loaders while content loads
- **Post Cards**: Skeleton versions of blog post cards
- **Content Areas**: Skeleton versions of blog content

**Key Features Used:**
- Different skeleton sizes for various content types
- Consistent loading experience across the app

**Code Example:**
```tsx
{loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-full">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                    <Skeleton className="w-full h-5 mb-2" />
                    <Skeleton className="w-3/4 h-4" />
                </div>
            </Card>
        ))}
    </div>
) : (
    // Actual content
)}
```

### 14. Toast Component (`src/components/ui/toast/`)

**Usage Examples:**
- **Success Messages**: Confirm successful operations
- **Error Messages**: Display validation and API errors
- **User Feedback**: Provide immediate feedback for user actions

**Key Features Used:**
- `toast.push()` for displaying notifications
- Different alert types (success, danger, warning)
- Custom placement options

**Code Example:**
```tsx
toast.push(
    <Alert showIcon type="success" title="Blog post created successfully!" />,
    { placement: 'top-center' }
)
```

### 15. Dropdown Component (`src/components/ui/Dropdown/Dropdown.tsx`)

**Usage Examples:**
- **Post Actions**: Edit and delete options for blog posts
- **User Menu**: Additional options and settings
- **Context Menus**: Right-click style interactions

**Key Features Used:**
- `Dropdown.Menu` for menu structure
- `Dropdown.Item` for individual menu items
- Custom styling and positioning

**Code Example:**
```tsx
<Dropdown>
    <Button
        variant="plain"
        icon={<HiOutlineMoreVertical />}
    />
    <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>
            <HiOutlineEdit className="mr-2" />
            Edit Post
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>
            <HiOutlineTrash className="mr-2" />
            Delete Post
        </Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
```

## Advanced Component Integration

### Responsive Design
All components use Tailwind CSS classes for responsive design:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for responsive grids
- `flex-col sm:flex-row` for responsive layouts
- `text-lg md:text-xl lg:text-2xl` for responsive typography

### State Management
The system uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- `useNavigate` for programmatic navigation

### Form Validation
Comprehensive form validation using:
- Real-time error clearing
- Required field validation
- Custom error messages
- Visual feedback with error states

### Performance Optimization
- Lazy loading of components
- Memoized calculations
- Efficient re-renders
- Skeleton loading states

## File Structure

```
src/views/blog/
├── BlogDashboard.tsx    # Main dashboard component
├── BlogList.tsx         # Blog posts list view
├── BlogCreate.tsx       # Create/edit blog post form
├── BlogDetail.tsx       # Individual blog post view
├── types.ts            # TypeScript type definitions
└── index.ts            # Component exports
```

## Usage Instructions

1. **Navigate to Blog Dashboard**: Visit `/blog` to access the main dashboard
2. **View Overview**: See statistics, popular tags, and recent posts
3. **Browse Posts**: Switch to "All Posts" tab to view all blog posts
4. **Create Post**: Use "Create Post" tab to add new blog posts
5. **Edit Posts**: Click the edit button on any post card
6. **View Details**: Click on any post to see the full content and comments

## Customization

The system is highly customizable:
- Modify color schemes using Tailwind CSS classes
- Adjust component sizes and spacing
- Add new fields to the blog post form
- Implement additional features like categories or user roles
- Integrate with backend APIs for data persistence

## Benefits of Using Ecme Components

1. **Consistency**: All components follow the same design system
2. **Accessibility**: Built-in accessibility features
3. **Responsiveness**: Mobile-first responsive design
4. **Performance**: Optimized for fast rendering
5. **Maintainability**: Clean, well-structured code
6. **Extensibility**: Easy to customize and extend

This blog system demonstrates the power and flexibility of the Ecme template's component library, showing how to build complex, professional applications using pre-built, high-quality UI components. 