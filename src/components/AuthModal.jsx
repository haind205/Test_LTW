import { useState, useEffect } from 'react'
import {
  Shield,
  GraduationCap,
  User,
  CheckCircle2,
  Star
} from 'lucide-react'

export default function AuthModal({ isOpen, onClose, initialTab = 'login', onLoginSuccess }) {
  const [tab, setTab] = useState(initialTab) // 'login' | 'register'
  const [role, setRole] = useState('tutor') // 'student' | 'tutor' | 'admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Đồng bộ tab mỗi lần mở modal
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab)
      setSuccessMsg('')
    }
  }, [isOpen, initialTab])

  if (!isOpen) return null

  // Đăng nhập nhanh tài khoản mẫu
  const handleQuickLogin = (demoUser) => {
    onLoginSuccess(demoUser)
    setSuccessMsg(`Đăng nhập thành công với vai trò: ${demoUser.roleName}`)
    setTimeout(() => {
      setSuccessMsg('')
      onClose()
    }, 900)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userObj = {
      fullName:
        fullName.trim() ||
        (role === 'admin'
          ? 'Quản trị viên HSA'
          : role === 'tutor'
          ? 'Thầy Kevin Nguyễn'
          : 'Nguyễn Văn Học'),
      email: email.trim() || `${role}@gmail.com`,
      role,
      roleName:
        role === 'admin'
          ? 'Quản trị viên (Admin)'
          : role === 'tutor'
          ? 'Gia sư (Tutor)'
          : 'Học viên (Student)',
      avatar:
        role === 'tutor'
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
          : role === 'admin'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    }

    onLoginSuccess(userObj)
    setSuccessMsg(`✓ ${tab === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'} thành công!`)
    setTimeout(() => {
      setSuccessMsg('')
      onClose()
    }, 900)
  }

  return (
    <div className="tc-auth-overlay" onClick={onClose}>
      <div className="tc-auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* ==============================================
            CỘT TRÁI: NỀN VÀNG SÁNG (THEO CHUẨN GIAO DIỆN NHÓM TRƯỞNG)
            ============================================== */}
        <div className="tc-auth-left">
          {/* Logo TutorCenter */}
          <div className="tc-auth-brand-row">
            <div className="tc-auth-logo-badge">T</div>
            <span className="tc-auth-brand-title">TutorCenter</span>
          </div>

          {/* Pill Badge Giới thiệu */}
          <div className="tc-auth-badge-pill">
            <Star size={13} fill="#d97706" color="#d97706" />
            <span>Nền tảng kết nối gia sư hàng đầu, đưa bạn chạm tay đến ước mơ</span>
          </div>

          {/* Headline lớn với chữ "đội ngũ gia sư" nổi bật màu trắng */}
          <h2 className="tc-auth-heading">
            Kết nối học viên với <span className="tc-text-highlight">đội ngũ gia sư</span> xuất sắc nhất
          </h2>

          {/* Mô tả phụ */}
          <p className="tc-auth-desc">
            Hệ thống luyện thi chuyên sâu với lộ trình cá nhân hóa, ngân hàng đề thi thử sát đề và đội ngũ gia sư hàng đầu.
          </p>

          {/* Danh sách 2 badge cam kết */}
          <div className="tc-auth-check-list">
            <div className="tc-auth-check-item">
              <span className="tc-auth-check-icon">✓</span>
              <span>Gia sư uy tín, điểm số cao, kiểm duyệt kỹ lưỡng</span>
            </div>
            <div className="tc-auth-check-item">
              <span className="tc-auth-check-icon">✓</span>
              <span>Lộ trình học tập linh hoạt 1 kèm 1</span>
            </div>
          </div>
        </div>

        {/* ==============================================
            CỘT PHẢI: FORM ĐĂNG NHẬP / ĐĂNG KÝ TRẮNG TINH
            ============================================== */}
        <div className="tc-auth-right">
          {/* Header trên cùng */}
          <div className="tc-auth-top-bar">
            <h3 className="tc-auth-title">
              {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </h3>
            <button
              type="button"
              className="tc-auth-home-btn"
              onClick={onClose}
              title="Quay lại trang chủ"
            >
              ← Trang chủ
            </button>
          </div>

          {/* Segmented Control Switch Tabs (Đăng nhập / Đăng ký) */}
          <div className="tc-auth-tabs">
            <button
              type="button"
              className={`tc-auth-tab-pill ${tab === 'login' ? 'active' : ''}`}
              onClick={() => setTab('login')}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={`tc-auth-tab-pill ${tab === 'register' ? 'active' : ''}`}
              onClick={() => setTab('register')}
            >
              Đăng ký
            </button>
          </div>

          {successMsg ? (
            <div className="tc-auth-success-state">
              <CheckCircle2 size={52} color="#16a34a" style={{ margin: '0 auto 12px' }} />
              <h3>{successMsg}</h3>
              <p>Đang đồng bộ quyền hạn vào hệ thống...</p>
            </div>
          ) : (
            <>
              {/* Chọn vai trò (giữ nguyên đầy đủ để phục vụ bài tập lớn) */}
              <div className="tc-auth-role-wrapper">
                <span className="tc-auth-input-label">CHỌN VAI TRÒ</span>
                <div className="tc-auth-role-group">
                  <button
                    type="button"
                    className={`tc-auth-role-btn ${role === 'student' ? 'active' : ''}`}
                    onClick={() => setRole('student')}
                  >
                    <User size={13} /> Học viên
                  </button>
                  <button
                    type="button"
                    className={`tc-auth-role-btn ${role === 'tutor' ? 'active' : ''}`}
                    onClick={() => setRole('tutor')}
                  >
                    <GraduationCap size={13} /> Gia sư
                  </button>
                  <button
                    type="button"
                    className={`tc-auth-role-btn ${role === 'admin' ? 'active' : ''}`}
                    onClick={() => setRole('admin')}
                  >
                    <Shield size={13} /> Admin
                  </button>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="tc-auth-form">
                {tab === 'register' && (
                  <>
                    <div className="tc-auth-input-group">
                      <label className="tc-auth-input-label">HỌ VÀ TÊN</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="tc-auth-input-field"
                      />
                    </div>

                    <div className="tc-auth-input-group">
                      <label className="tc-auth-input-label">SỐ ĐIỆN THOẠI</label>
                      <input
                        type="tel"
                        placeholder="0988 xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="tc-auth-input-field"
                      />
                    </div>
                  </>
                )}

                <div className="tc-auth-input-group">
                  <label className="tc-auth-input-label">EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="tc-auth-input-field"
                  />
                </div>

                <div className="tc-auth-input-group">
                  <div className="tc-auth-label-row">
                    <label className="tc-auth-input-label">MẬT KHẨU</label>
                    <button
                      type="button"
                      className="tc-forgot-password"
                      onClick={() => alert('Vui lòng liên hệ quản trị viên hoặc sử dụng đăng nhập nhanh bên dưới!')}
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="tc-auth-input-field"
                  />
                </div>

                {/* Nút Submit vàng cam nổi bật */}
                <button type="submit" className="tc-auth-submit-btn">
                  {tab === 'login' ? 'Đăng nhập' : 'Đăng ký ngay'}
                </button>
              </form>

              {/* Dòng chuyển đổi tab ở chân form */}
              <div className="tc-auth-switch-prompt">
                {tab === 'login' ? (
                  <span>
                    Bạn chưa có tài khoản?{' '}
                    <button
                      type="button"
                      className="tc-auth-link"
                      onClick={() => setTab('register')}
                    >
                      Đăng ký ngay
                    </button>
                  </span>
                ) : (
                  <span>
                    Bạn đã có tài khoản?{' '}
                    <button
                      type="button"
                      className="tc-auth-link"
                      onClick={() => setTab('login')}
                    >
                      Đăng nhập ngay
                    </button>
                  </span>
                )}
              </div>

              {/* Đăng nhập nhanh tài khoản mẫu để test quyền (phục vụ giảng viên chấm) */}
              <div className="tc-auth-demo-box">
                <div className="tc-auth-demo-label">⚡ Đăng nhập nhanh để test quyền:</div>
                <div className="tc-auth-demo-chips">
                  <button
                    type="button"
                    className="tc-demo-chip-btn tutor"
                    onClick={() =>
                      handleQuickLogin({
                        fullName: 'Thầy Kevin Nguyễn',
                        email: 'kevin.math@hsa.edu.vn',
                        role: 'tutor',
                        roleName: 'Gia sư',
                        avatar:
                          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
                      })
                    }
                  >
                    👨‍🏫 Gia sư
                  </button>
                  <button
                    type="button"
                    className="tc-demo-chip-btn admin"
                    onClick={() =>
                      handleQuickLogin({
                        fullName: 'Quản trị viên HSA',
                        email: 'admin@hsa.edu.vn',
                        role: 'admin',
                        roleName: 'Admin',
                        avatar:
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                      })
                    }
                  >
                    🛡️ Admin
                  </button>
                  <button
                    type="button"
                    className="tc-demo-chip-btn student"
                    onClick={() =>
                      handleQuickLogin({
                        fullName: 'Trần Minh Hải',
                        email: 'minhhai@student.ptit.edu.vn',
                        role: 'student',
                        roleName: 'Học viên',
                        avatar:
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
                      })
                    }
                  >
                    🎓 Học viên
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
