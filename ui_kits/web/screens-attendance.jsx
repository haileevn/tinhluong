/* Module Chấm công — vcard */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button } = DS;
  const { Modal, PeriodPicker, usePeriod, VCardGrid, VCard, VCardHead, VCardRows, VCardField, VCardActions, EmptyState } = window.LuaShared;
  const { fmtDate, canWrite } = window.LuaUtils;
  const api = window.LuaAPI;

  function AttendanceScreen({ user }) {
    const { year, month, setPeriod } = usePeriod();
    const [records, setRecords] = React.useState([]);
    const [summary, setSummary] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [modal, setModal] = React.useState(null);
    const [err, setErr] = React.useState('');
    const write = canWrite(user?.role, 'attendance');

    const load = React.useCallback(() => {
      Promise.all([
        api.get(`/attendances?year=${year}&month=${month}`),
        api.get(`/attendances/summary?year=${year}&month=${month}`),
        api.get('/employees?status=active'),
      ]).then(([r, s, e]) => { setRecords(r); setSummary(s); setEmployees(e); });
    }, [year, month]);

    React.useEffect(() => { load(); }, [load]);

    const save = async (f) => {
      try {
        if (modal?.id) await api.put(`/attendances/${modal.id}`, f);
        else await api.post('/attendances', f);
        setModal(null); setErr(''); load();
      } catch (e) { setErr(e.message); }
    };

    const form = modal ? (
      <form className="lw-form" onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        save({
          employee_id: Number(fd.get('employee_id')),
          work_date: fd.get('work_date'),
          work_units: Number(fd.get('work_units')),
          hours: Number(fd.get('hours')),
          overtime_hours: Number(fd.get('overtime_hours')),
          notes: fd.get('notes'),
        });
      }}>
        {err && <div className="lw-form__err">{err}</div>}
        {!modal.id && (
          <label>Nhân viên
            <select name="employee_id" required defaultValue="">
              <option value="" disabled>Chọn nhân viên</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name} ({e.code})</option>)}
            </select>
          </label>
        )}
        <label>Ngày làm<input type="date" name="work_date" defaultValue={modal.work_date || ''} required /></label>
        <label>Số công<input type="number" step="0.5" min="0" name="work_units" defaultValue={modal.work_units ?? 1} /></label>
        <label>Số giờ<input type="number" step="0.5" min="0" name="hours" defaultValue={modal.hours ?? 8} /></label>
        <label>Tăng ca (giờ)<input type="number" step="0.5" min="0" name="overtime_hours" defaultValue={modal.overtime_hours ?? 0} /></label>
        <label>Ghi chú<textarea name="notes" defaultValue={modal.notes || ''} /></label>
        <div className="lw-form__actions">
          <Button variant="secondary" onClick={() => setModal(null)}>Hủy</Button>
          <Button variant="primary" type="submit">Lưu</Button>
        </div>
      </form>
    ) : null;

    return (
      <div>
        <div className="lw-pagehead">
          <PeriodPicker year={year} month={month} onChange={setPeriod} />
          {write && <Button variant="primary" icon="plus" onClick={() => { setModal({}); setErr(''); }}>Nhập công</Button>}
        </div>

        <p className="lw-sectitle">Tổng công tháng {month}/{year}</p>
        <VCardGrid>
          {summary.filter((s) => s.attendance_days > 0).map((s) => (
            <VCard key={s.employee_id}>
              <VCardHead title={s.name} subtitle={s.code} />
              <VCardRows>
                <VCardField label="Tổng công" value={s.total_work_units} tone="mono" />
                <VCardField label="Tổng giờ" value={s.total_hours} tone="mono" />
                <VCardField label="Tăng ca" value={`${s.total_overtime_hours} giờ`} tone="mono" full />
              </VCardRows>
            </VCard>
          ))}
        </VCardGrid>

        <div style={{ height: 16 }} />
        <p className="lw-sectitle">Chi tiết từng ngày</p>
        {!records.length ? <EmptyState>Chưa có dữ liệu chấm công</EmptyState> : (
          <VCardGrid>
            {records.map((r) => (
              <VCard key={r.id}>
                <VCardHead title={r.employee_name} subtitle={fmtDate(r.work_date)} />
                <VCardRows>
                  <VCardField label="Số công" value={r.work_units} tone="mono" />
                  <VCardField label="Số giờ" value={r.hours} tone="mono" />
                  <VCardField label="Tăng ca" value={`${r.overtime_hours} giờ`} tone="mono" />
                  {r.notes && <VCardField label="Ghi chú" value={r.notes} full />}
                </VCardRows>
                {write && (
                  <VCardActions>
                    <Button size="sm" variant="secondary" onClick={() => { setModal(r); setErr(''); }}>Sửa</Button>
                  </VCardActions>
                )}
              </VCard>
            ))}
          </VCardGrid>
        )}

        {modal && <Modal title={modal.id ? 'Sửa công' : 'Nhập công theo ngày'} onClose={() => setModal(null)}>{form}</Modal>}
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { AttendanceScreen });
})();
