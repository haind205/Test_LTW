import { useState, useRef } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Search,
  ChevronDown,
  ShieldCheck,
  LogOut,
  Bell,
  Sparkles,
  LayoutGrid,
  Calendar,
  BookOpen,
  User,
  X
} from 'lucide-react'
import AuthModal from './AuthModal'

// Đọc user đã đăng nhập từ localStorage
const readStoredUser = () => {
  try {
    const stored = localStorage.getItem('hsa_current_user')
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    console.error(e)
    return null
  }
}

export default function Header() {
  const [currentUser, setCurrentUser] = useState(readStoredUser)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState('login')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [exploreOpen, setExploreOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    localStorage.setItem('hsa_current_user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('hsa_current_user')
  }

  const openLogin = () => {
    setAuthModalTab('login')
    setAuthModalOpen(true)
  }

  const openRegister = () => {
    setAuthModalTab('register')
    setAuthModalOpen(true)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
      navigate(`/?search=${encodeURIComponent(searchKeyword.trim())}`)
      setSearchOpen(false)
    }
  }

  const toggleSearch = () => {
    setSearchOpen((prev) => {
      const next = !prev
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
      return next
    })
  }

  // Xác định active tab cho thanh pill navbar
  const isClassesActive = location.pathname === '/' || location.pathname.startsWith('/classes')
  const isManageActive = location.pathname.startsWith('/manage-classes')

  return (
    <>
      <header className="tc-header-wrapper">
        <div className="tc-header-inner">
          {/* =========================================================
              1. LOGO TUTORCENTER (BÊN TRÁI)
              ========================================================= */}
          <Link to="/" className="tc-brand">
            <div className="tc-brand-icon">T</div>
            <div className="tc-brand-meta">
              <span className="tc-brand-name">TutorCenter</span>
              <span className="tc-brand-tagline">Hệ thống học tập thông minh</span>
            </div>
          </Link>

          {/* =========================================================
              2. CENTER PILL NAVBAR (CHUẨN GIAO DIỆN HÌNH 2 NHÓM TRƯỞNG)
              [Tổng quan] [Lịch học] [Tìm gia sư] [Khóa học] [Tài khoản]
              ========================================================= */}
          <nav className="tc-pill-navbar" aria-label="Menu chính">
            {/* 1. Tổng quan */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => `tc-nav-pill ${isActive ? 'active' : ''}`}
            >
              <LayoutGrid size={15} />
              <span>Tổng quan</span>
            </NavLink>

            {/* 2. Lịch học / Lớp học (Active Tab chuẩn với nền trắng bo tròn) */}
            <NavLink
              to="/"
              className={`tc-nav-pill ${isClassesActive ? 'active' : ''}`}
            >
              <Calendar size={15} />
              <span>Lịch học</span>
            </NavLink>

            {/* 3. Tìm gia sư (Mở thanh tìm kiếm) */}
            <button
              type="button"
              className={`tc-nav-pill ${searchOpen ? 'active' : ''}`}
              onClick={toggleSearch}
              title="Tìm kiếm gia sư & lớp học"
            >
              <Search size={15} />
              <span>Tìm gia sư</span>
            </button>

            {/* 4. Khóa học (Dropdown danh mục môn học) */}
            <div className="tc-nav-dropdown-anchor">
              <button
                type="button"
                className={`tc-nav-pill ${exploreOpen ? 'active' : ''}`}
                onClick={() => setExploreOpen(!exploreOpen)}
              >
                <BookOpen size={15} />
                <span>Khóa học</span>
                <ChevronDown size={13} className={`tc-arrow-icon ${exploreOpen ? 'rotate' : ''}`} />
              </button>

              {exploreOpen && (
                <div className="tc-dropdown-menu">
                  <div className="tc-dropdown-header">DANH MỤC MÔN HỌC</div>
                  <Link to="/" onClick={() => setExploreOpen(false)}>📚 Tất cả môn học</Link>
                  <Link to="/classes/class-1" onClick={() => setExploreOpen(false)}>📐 Luyện thi Toán THPT</Link>
                  <Link to="/classes/class-2" onClick={() => setExploreOpen(false)}>🇨🇳 Tiếng Trung HSK</Link>
                  <Link to="/classes/class-3" onClick={() => setExploreOpen(false)}>⚡ Vật Lý nâng cao</Link>
                  <Link to="/classes/class-4" onClick={() => setExploreOpen(false)}>🧪 Hóa học đại học</Link>
                  <Link to="/classes/class-5" onClick={() => setExploreOpen(false)}>🇬🇧 IELTS Academic</Link>
                </div>
              )}
            </div>

            {/* 5. Quản lý lớp / Tài khoản */}
            <NavLink
              to="/manage-classes"
              className={`tc-nav-pill ${isManageActive ? 'active' : ''}`}
              title="Dành cho Gia sư & Admin"
            >
              <ShieldCheck size={15} />
              <span>Quản lý lớp</span>
            </NavLink>

            <button
              type="button"
              className="tc-nav-pill"
              onClick={currentUser ? undefined : openLogin}
              title={currentUser ? currentUser.fullName : 'Đăng nhập tài khoản'}
            >
              <User size={15} />
              <span>{currentUser ? currentUser.roleName || 'Tài khoản' : 'Tài khoản'}</span>
            </button>
          </nav>

          {/* =========================================================
              3. RIGHT ACTION BUTTONS (BÊN PHẢI)
              [# VIP] [Chuông thông báo] [Nút Đăng xuất đỏ / Đăng nhập]
              ========================================================= */}
          <div className="tc-header-actions">
            {/* Badge # VIP */}
            <div className="tc-vip-chip">
              <Sparkles size={12} />
              <span>VIP</span>
            </div>

            {/* Chuông thông báo */}
            <button
              type="button"
              className="tc-bell-button"
              title="Thông báo mới"
              onClick={() => alert('Hiện không có thông báo mới.')}
            >
              <Bell size={16} />
              <span className="tc-bell-indicator"></span>
            </button>

            {/* Phần tài khoản & Nút Đăng xuất */}
            {currentUser ? (
              <div className="tc-logged-user-group">
                <div className="tc-user-chip" title={`${currentUser.fullName} (${currentUser.roleName || currentUser.role})`}>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    className="tc-user-avatar"
                  />
                  <div className="tc-user-text">
                    <span className="tc-user-name">{currentUser.fullName}</span>
                    <span className="tc-user-role">{currentUser.roleName || currentUser.role}</span>
                  </div>
                </div>

                {/* Nút Đăng xuất viền đỏ/hồng chuẩn hình nhóm trưởng */}
                <button
                  type="button"
                  className="tc-logout-btn"
                  onClick={handleLogout}
                  title="Đăng xuất khỏi hệ thống"
                >
                  <LogOut size={14} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <div className="tc-guest-auth-btns">
                <button type="button" className="tc-login-link-btn" onClick={openLogin}>
                  Đăng nhập
                </button>
                <button type="button" className="tc-join-pill-btn" onClick={openRegister}>
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            THANH TÌM KIẾM MỞ RỘNG (KHI BẤM "TÌM GIA SƯ")
            ========================================================= */}
        {searchOpen && (
          <div className="tc-search-drawer">
            <form onSubmit={handleSearchSubmit} className="tc-search-drawer-form">
              <Search size={18} className="tc-search-drawer-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Nhập tên môn học, gia sư hoặc lớp bạn muốn tìm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="tc-search-drawer-input"
              />
              <button type="submit" className="tc-search-drawer-submit">
                Tìm kiếm
              </button>
              <button
                type="button"
                className="tc-search-drawer-close"
                onClick={() => setSearchOpen(false)}
                title="Đóng tìm kiếm"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Modal Đăng nhập / Đăng ký kiểu mới theo nhóm trưởng */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
